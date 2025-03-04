import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { UsersModule } from 'src/users/users.module';
import { MenuModule } from 'src/menu/menu.module';
import { SideDishesModule } from 'src/side-dishes/side-dishes.module';
import { DrinksModule } from 'src/drinks/drinks.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports:[
    UsersModule,
    MenuModule,
    SideDishesModule,
    DrinksModule,
    OrderModule
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
