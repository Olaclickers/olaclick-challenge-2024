import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import Menu from './models/menu.model';
import { InjectModel } from '@nestjs/sequelize';
import { menus } from './seed/data';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { createCustomException } from 'src/common/exceptions/generator.exception';
import { paginate } from 'src/common/pagination/paginate';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectModel(Menu)
    private readonly menuModel: typeof Menu,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.onInit();
  }
  private async onInit(): Promise<void> {
    await this.saveMenu();
  }
  private async saveMenu(): Promise<void> {
    const existingMenu = await this.menuModel.count();
    if (existingMenu === 0) {
      await this.menuModel.bulkCreate(menus);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Pagination<Menu>> {
    const { page = 1, limit = 10 } = paginationDto;

    const { rows: menu, count: totalItems } = await this.menuModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });
    const _menu = menu.map((menu) => menu.toJSON());
    if (!_menu.length) {
      throw createCustomException('Menu no encontrado revice los cliterios de busqueda.', 404, 'Client');
    }

    return paginate(_menu, totalItems, page, limit);
  }

  async findAllMenu() {
    return await this.menuModel.count();
  }

  async findById(id: string): Promise<Menu | null> {
    return await this.menuModel.findOne({ where: { id } });
  }
}
