import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import Order from './models/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import OrderItem from './models/orderItem.model';

@Module({
  imports:[
    SequelizeModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`], // Ajusta la URL de tu servidor RabbitMQ
            queue: 'orders_queue', // El nombre de la cola que estás utilizando
          },
        });
      },
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
