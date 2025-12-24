import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Redis from 'ioredis';
import Order from './models/order.model';
import { Op } from 'sequelize';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import OrderItem from './models/orderItem.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PageOptionsDto } from 'src/common/paginate/page-options.dto';
import { PageMetaDto } from 'src/common/paginate/page-meta.dto';
import { PageResponseDto } from 'src/common/paginate/page.response.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CustomHttpExceptionValidate } from 'src/config/exeptions/CustomHttpException';

@Injectable()
export class OrdersService {
  private redisClient: Redis;

  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(OrderItem) private readonly orderItemModel: typeof OrderItem,
    @Inject('ORDER_SERVICE') private readonly rabbitMQClient: ClientProxy,
    private readonly i18n: I18nService,
  ) {
    this.redisClient = new Redis({ host: 'localhost', port: 6379 });
  }

  // async getActiveOrders() {
  //   const cachedOrders = await this.redisClient.get('active_orders');
  //   if (cachedOrders) return JSON.parse(cachedOrders);

  //   const orders = await this.orderModel.findAll({
  //     where: { estado: { [Op.not]: 'entregado' } }, // Excluye órdenes entregadas
  //   });

  //   await this.redisClient.set('active_orders', JSON.stringify(orders), 'EX', 60);
  //   // return orders;
  //   return JSON.stringify(orders);
  // }

  async getActiveOrders(pageOptionsDto: PageOptionsDto) {
    const i18n = I18nContext.current();
    const cacheKey = `active_orders_page_${pageOptionsDto.page ?? 1}_limit_${pageOptionsDto.limit ?? 10}`;
    const cachedOrders = await this.redisClient.get(cacheKey);

    if (cachedOrders) return JSON.parse(cachedOrders);

    // Asegúrate de que `page` y `limit` no sean undefined
    const page = pageOptionsDto.page ?? 1; // Valor predeterminado 1 si no se pasa
    const limit = pageOptionsDto.limit ?? 10; // Valor predeterminado 10 si no se pasa

    // Calcular el desplazamiento (offset)
    const offset = (page - 1) * limit;

    // Obtener órdenes con paginación
    const { rows: orders, count } = await this.orderModel.findAndCountAll({
      where: { estado: { [Op.not]: 'entregado' } }, // Excluye órdenes entregadas
      offset, // Aplicar el offset calculado
      limit, // Limite
    });

    if (!orders.length) {
      const error = i18n!.t('lang.PAGINATION.NO_RESULT_FOUND', { lang: i18n!.lang });
      // const error = i18n!.t('lang.USERS.NOT_FOUND', { lang: i18n!.lang });
      throw new CustomHttpExceptionValidate('Get', 'orders', error, 'page', 404);
    }

    // Formatear las órdenes obtenidas
    const formattedOrders = orders.map(order => order.dataValues);

    // Crear los metadatos de paginación
    const meta = new PageMetaDto({
      pageOptionsDto: { page, limit, skip: offset }, // Pasar el 'skip' correctamente
      itemCount: count,
    });

    // Crear la respuesta con los datos y los metadatos de paginación
    const response = new PageResponseDto(formattedOrders, meta);

    // Guardar en caché la respuesta por 60 segundos
    await this.redisClient.set(cacheKey, JSON.stringify(response), 'EX', 60);

    return response;
  }

  async getOrderById(id: string) {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const transaction = await this.orderModel.sequelize?.transaction();

    try {
      const detalle = createOrderDto.items.map(item => item.descripcion).join(' + ');
      // 1. Crear la orden y sus ítems de una sola vez
      const order = await this.orderModel.create(
        {
          cliente: createOrderDto.cliente,
          estado: createOrderDto.estado,
          total: createOrderDto.total,
          detalle,
          items: createOrderDto.items,
        },
        {
          include: [OrderItem],
          transaction,
        },
      );

      await transaction?.commit();
      await this.redisClient.del('active_orders');

      return order.toJSON();
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }

  async updateOrderStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderModel.findByPk(id);
    if (!order) return null;
    const { estado } = updateOrderStatusDto;
    order.estado = estado;
    await order.save();

    // 🔥 Borrar la caché para actualizar la lista en la siguiente consulta
    await this.redisClient.del('active_orders');
    // Enviar evento a RabbitMQ
    this.rabbitMQClient.emit('order_updated', { orderId: id, estado });

    return order;
  }
}
