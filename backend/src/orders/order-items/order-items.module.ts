import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItem } from './entities/order-item.entity';


@Module({
  imports: [
    SequelizeModule.forFeature([OrderItem])
  ],
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
  ],
  exports: [
    OrderItemsService,
  ]
})
export class OrderItemsModule {}
