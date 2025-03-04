import { Module } from '@nestjs/common';
import { SideDishesService } from './side-dishes.service';
import { SideDishesController } from './side-dishes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import SideDishes from './models/side-dish.model';

@Module({
  imports:[
    SequelizeModule.forFeature([SideDishes])
  ],
  controllers: [SideDishesController],
  providers: [SideDishesService],
  exports: [SideDishesService],
})
export class SideDishesModule {}
