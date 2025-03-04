import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import Sales from './models/sale.model';
import { OrderService } from 'src/order/order.service';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { OrderStatus } from 'src/order/dto/create-order.dto';
import * as moment from 'moment';
import { Op } from 'sequelize';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { paginate } from 'src/common/pagination/paginate';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales)
    private readonly salesModel: typeof Sales,
    private readonly orderService: OrderService,
  ) {}

  @Cron('*/60 * * * *') // Se ejecuta cada 60 minutos
  async handleOrderStatusUpdate() {
    const orders = await this.orderService.findAllOrders();

    for (const order of orders) {
      if (order.status === OrderStatus.ENTREGADO) {
        const diffInHours = (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 3600);
        // const diffInHours = (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60);

        if (diffInHours > 12) {
          // Cambiar el estado de la orden a "cancelada"
          await this.orderService.updateStatus(order.id, OrderStatus.CANCELADO);
        }
      }
    }
  }

  async create(createSaleDto: CreateSaleDto) {
    const { order_id } = createSaleDto;
    const order = await this.orderService.findByID(order_id);
    if (!order || order.status !== OrderStatus.ENTREGADO) {
      throw createCustomException('La orden no está en estado entregado.', 400, 'Sales');
    }
    const sale = await this.salesModel.create(createSaleDto as Partial<Sales>);
    await this.orderService.updateStatus(order_id, OrderStatus.FACTURADO);
    return sale.toJSON();
  }

  async findAllByDateRange(startDate: Date, endDate: Date): Promise<Sales[]> {
    // Convertir las fechas a UTC si es necesario
    const _startDate = moment(startDate).utc().toDate();
    const _endDate = moment(endDate).utc().toDate();

    // Realizar la consulta
    const sales = await this.salesModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [_startDate, _endDate],
        },
      },
      include: ['order'], // Incluir la relación con Order si es necesario
    });
    return sales.map((sale) => sale.toJSON());
  }

  async findToday(paginationDto: PaginationDto): Promise<Pagination<Sales>> {
    const { page = 1, limit = 10 } = paginationDto; // Paginación basada en los valores de paginationDto
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const { rows: sales, count: totalItems } = await this.salesModel.findAndCountAll({
      where: {
        createdAt: {
          [Op.gte]: todayStart,
          [Op.lte]: todayEnd,
        },
      },
      offset: (page - 1) * limit,
      limit,
      include: ['order'],
    });

    const _sales = sales.map((sale) => sale.toJSON());
    if (!_sales.length) {
      throw createCustomException('Orden no encontrada. Revisa los criterios de búsqueda.', 404, 'Sales');
    }
    return paginate(_sales, totalItems, page, limit);
  }

  // async findAll(paginationDto: PaginationDto, status?: string): Promise<Pagination<Order>> {
  //   const whereCondition = status ? { status } : {}; // Si hay un status, lo usamos para filtrar
  //   const { page = 1, limit = 10 } = paginationDto; // Paginación basada en los valores de paginationDto

  //   const { rows: orders, count: totalItems } = await this.orderModel.findAndCountAll({
  //     where: whereCondition,
  //     offset: (page - 1) * limit,
  //     limit,
  //   });

  //   const _orders = orders.map((order) => order.toJSON());
  //   if (!_orders.length) {
  //     throw createCustomException('Orden no encontrada. Revisa los criterios de búsqueda.', 404, 'Client');
  //   }

  //   return paginate(_orders, totalItems, page, limit);
  // }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
