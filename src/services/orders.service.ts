import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from 'bull';
import { Op } from 'sequelize';
import { CreateOrderDto } from 'src/models/order/dtos/create-order.dto';
import { Order } from 'src/models/order/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectQueue('orders') private orderQueue: Queue,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = await this.orderModel.create({ ...createOrderDto } as any);

      await this.orderQueue.add('orderCreated', { orderId: newOrder.id });

      return newOrder;
    } catch (error) {
      throw new BadRequestException('Error al crear la orden');
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.findAll({
      where: { status: { [Op.not]: 'entregado' } },
    });
    if (!orders.length) {
      throw new NotFoundException('No se encontraron órdenes');
    }
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`No se encontró la orden con id ${id}`);
    }
    return order;
  }

  async updateStatus(id: number, status: string): Promise<void> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`No se encontró la orden con id ${id}`);
    }
    if (status === 'entregado') {
      await this.orderModel.destroy({ where: { id } });
    } else {
      await this.orderModel.update({ status }, { where: { id } });
    }

    await this.orderQueue.add('orderStatusUpdated', { orderId: id, status });
  }
}