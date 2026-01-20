import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination/pagination.interface';
import Menu from './models/menu.model';

@ApiTags('Menús')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de menús' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiResponse({ status: 200, description: 'La lista de menús.', type: [Menu] })
  findAll(@Query() paginationDto: PaginationDto): Promise<Pagination<Menu>> {
    return this.menuService.findAll(paginationDto);
  }
}
