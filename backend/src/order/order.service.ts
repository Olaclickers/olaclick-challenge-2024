import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderStatus } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import Order from './models/order.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { ClientService } from 'src/client/client.service';
import { MenuService } from 'src/menu/menu.service';
import { SideDishesService } from 'src/side-dishes/side-dishes.service';
import { DrinksService } from 'src/drinks/drinks.service';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { Op } from 'sequelize';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { paginate } from 'src/common/pagination/paginate';
import { IResponse } from 'src/common/interfaces/response.interface';
import Redis from 'ioredis';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    private readonly usersService: UsersService,
    private readonly clientService: ClientService,
    private readonly menuService: MenuService,
    private readonly disheService: SideDishesService,
    private readonly drinkService: DrinksService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}
  async create(createOrderDto: CreateOrderDto, user_id: string) {
    const { client_dni, menu_id, side_dishes_id, drinks_id } = createOrderDto;
    const _user = await this.usersService.findById(user_id);
    const client = await this.clientService.findById(client_dni);
    if (!client) {
      throw createCustomException(`Cliente con el dni ${client_dni} no existe.`, 404, 'Order');
    }

    if (menu_id) {
      const menu = await this.menuService.findById(menu_id);
      if (!menu) {
        throw createCustomException(`El menú con el id ${menu_id} no existe.`, 404, 'Order');
      }
    }

    if (side_dishes_id) {
      const sideDish = await this.disheService.findById(side_dishes_id);
      if (!sideDish) {
        throw createCustomException(`Acompañamiento con el id ${side_dishes_id} no existe.`, 404, 'Order');
      }
    }

    if (drinks_id) {
      const drink = await this.drinkService.findById(drinks_id);
      if (!drink) {
        throw createCustomException(`LA bebida con el id ${drinks_id} no existe`, 404, 'Order');
      }
    }

    const order = await this.orderModel.create({ ...createOrderDto, user_dni: _user?.dni } as Partial<Order>);
    await this.clearOrdersCache();
    return order.toJSON();
  }

  private async clearOrdersCache() {
    const redisScan = async (pattern: string) => {
        let cursor = '0';
        let keys: string[] = [];

        do {
            const reply = await this.redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
            cursor = reply[0];
            keys = keys.concat(reply[1]);
        } while (cursor !== '0');

        return keys;
    };

    const keysToDelete = await redisScan('orders:*');

    if (keysToDelete.length > 0) {
        await this.redisClient.del(keysToDelete);
    }
}

  async findAll(paginationDto: PaginationDto, status?: string): Promise<Pagination<Order>> {
    const { page = 1, limit = 10 } = paginationDto;
    const whereCondition = status ? { status } : {};

    // Generamos una clave única para el caché
    const cacheKey = `orders:page_${page}_limit_${limit}_status_${status ?? 'all'}`;

    // Intentamos obtener datos en caché
    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Si no está en caché, hacemos la consulta a la DB
    const { rows: orders, count: totalItems } = await this.orderModel.findAndCountAll({
      where: whereCondition,
      offset: (page - 1) * limit,
      limit,
    });

    const _orders = orders.map((order) => order.toJSON());
    if (!_orders.length) {
      throw createCustomException('Orden no encontrada. Revisa los criterios de búsqueda.', 404, 'Client');
    }

    const result = paginate(_orders, totalItems, page, limit);

    // Guardamos en caché con expiración de 5 minutos
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 60);

    return result;
  }

  async findAllOrders() {
    return (
      await this.orderModel.findAll({
        include: ['menu', 'sideDishes'],
      })
    ).map((order) => order.toJSON());
  }

  async findPending() {
    const cacheKey = 'orders:pending';

    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const orders = await this.orderModel.findAll({
      where: {
        status: {
          [Op.notIn]: ['entregado', 'cancelado', 'facturado'],
        },
      },
    });

    const result = orders.map((order) => order.toJSON());

    // Guardamos en caché con expiración de 5 minutos
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 60);

    return result;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw createCustomException('Orden no encontrada.', 404, 'Order');
    }
    return order;
  }

  async findByID(id: string) {
    const order = await this.orderModel.findOne({
      where: { id },
    });
    return order?.toJSON();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return (await order.update(updateOrderDto)).toJSON();
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.findOne(id);
    return (await order.update({ status })).toJSON();
  }

  async remove(id: string): Promise<IResponse> {
    const order = await this.findOne(id);
    await order.destroy();
    return {
      message: 'La orden fue eliminado exitosamente',
      code: 'OK_ORDER_DELETE',
    };
  }
}
