import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { InjectModel } from '@nestjs/sequelize';
import Drinks from './models/drink.model';
import { drinks } from './seed/data';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { paginate } from 'src/common/pagination/paginate';

@Injectable()
export class DrinksService implements OnModuleInit {
  constructor(
    @InjectModel(Drinks)
    private readonly drinksModel: typeof Drinks,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.onInit();
  }
  private async onInit(): Promise<void> {
    await this.saveDrinks();
  }
  private async saveDrinks(): Promise<void> {
    const existingDrinks = await this.drinksModel.count();
    if (existingDrinks === 0) {
      await this.drinksModel.bulkCreate(drinks);
    }
  }
  async findAll(paginationDto: PaginationDto): Promise<Pagination<Drinks>> {
    const { page = 1, limit = 10 } = paginationDto;

    const { rows: drinks, count: totalItems } = await this.drinksModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });
    const _drinks = drinks.map((drink) => drink.toJSON());
    if (!_drinks.length) {
      throw createCustomException('Bebidas no encontrado revice los cliterios de busqueda.', 404, 'Client');
    }

    return paginate(_drinks, totalItems, page, limit);
  }

  async findAllDrinks() {
    return await this.drinksModel.count();
  }

  async findById(id: string): Promise<Drinks | null> {
    return await this.drinksModel.findOne({ where: { id } });
  }
}
