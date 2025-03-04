import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Sales from './models/sale.model';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Sales]),
    OrderModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
