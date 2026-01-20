import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { DrinksService } from './drinks.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@ApiTags('Drinks')
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de bebidas' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiResponse({ status: 200, description: 'La lista de bebidas.', })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.drinksService.findAll(paginationDto);
  }
}
