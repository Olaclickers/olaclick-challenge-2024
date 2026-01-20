import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSideDishDto } from './dto/create-side-dish.dto';
import { UpdateSideDishDto } from './dto/update-side-dish.dto';
import SideDishes from './models/side-dish.model';
import { InjectModel } from '@nestjs/sequelize';
import { sideDishes } from './seed/data';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { paginate } from 'src/common/pagination/paginate';

@Injectable()
export class SideDishesService implements OnModuleInit {
  constructor(
    @InjectModel(SideDishes)
    private readonly sideDishModel: typeof SideDishes,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.onInit();
  }
  private async onInit(): Promise<void> {
    await this.saveSideDishes();
  }
  private async saveSideDishes(): Promise<void> {
    const existingSideDishes = await this.sideDishModel.count();
    if (existingSideDishes === 0) {
      await this.sideDishModel.bulkCreate(sideDishes);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Pagination<SideDishes>> {
    const { page = 1, limit = 10 } = paginationDto;

    const { rows: dishes, count: totalItems } = await this.sideDishModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });
    const _dishes = dishes.map((dish) => dish.toJSON());
    if (!_dishes.length) {
      throw createCustomException('Platos no encontrado revice los cliterios de busqueda.', 404, 'Client');
    }

    return paginate(_dishes, totalItems, page, limit);
  }

  async findAllSaleDishes(){
    return await this.sideDishModel.count()
  }

  async findById(id: string): Promise<SideDishes | null> {
    return await this.sideDishModel.findOne({ where: { id } });
  }
}
