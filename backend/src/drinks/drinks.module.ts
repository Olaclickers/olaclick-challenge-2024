import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Drinks from './models/drink.model';

@Module({
  imports:[
    SequelizeModule.forFeature([Drinks])
  ],
  controllers: [DrinksController],
  providers: [DrinksService],
  exports: [DrinksService],
})
export class DrinksModule {}
