import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Order from './models/order.model';
import { UsersModule } from 'src/users/users.module';
import { ClientModule } from 'src/client/client.module';
import { MenuModule } from 'src/menu/menu.module';
import { SideDishesModule } from 'src/side-dishes/side-dishes.module';
import { DrinksModule } from 'src/drinks/drinks.module';
import { RedisModule } from 'src/redis/RedisProvider.module';

@Module({
  imports:[
    SequelizeModule.forFeature([Order]),
    // OrderModule,
    UsersModule,
    ClientModule,
    MenuModule,
    SideDishesModule,
    DrinksModule,
    RedisModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
