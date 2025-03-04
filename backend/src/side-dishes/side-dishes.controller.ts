import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { SideDishesService } from './side-dishes.service';
import { CreateSideDishDto } from './dto/create-side-dish.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@ApiTags('Side-Dishes')
@Controller('side-dishes')
export class SideDishesController {
  constructor(private readonly sideDishesService: SideDishesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de Acompañamientos' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiResponse({ status: 200, description: 'La lista de Acompañamientos.', type: [CreateSideDishDto] })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.sideDishesService.findAll(paginationDto);
  }
}
