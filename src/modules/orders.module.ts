import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from 'src/services/orders.service';
import { OrdersController } from 'src/controllers/orders.controller';
import { Order } from 'src/models/order/order.model';
import { OrderDetail } from 'src/models/order/order-detail.model';
import { BullModule } from '@nestjs/bull';
import { OrdersProcessor } from 'src/orders.processor';

@Module({
    imports: [
      SequelizeModule.forFeature([Order, OrderDetail]),
      BullModule.registerQueue({
        name: 'orders',
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersProcessor],
  })
  export class OrdersModule {}