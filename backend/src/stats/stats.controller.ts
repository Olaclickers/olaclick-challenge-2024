import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('total-users')
  @ApiOperation({ summary: 'Obtener el total de usuarios' })
  @ApiResponse({ status: 200, description: 'Total de usuarios.', type: Number })
  async getTotalUsers() {
    return this.statsService.getTotalUsers();
  }

  @Get('total-menu')
  @ApiOperation({ summary: 'Obtener el total de elementos en el menú' })
  @ApiResponse({ status: 200, description: 'Total de elementos en el menú.', type: Number })
  async getTotalMenuItems() {
    return this.statsService.getTotalMenuItems();
  }

  @Get('total-side-dishes')
  @ApiOperation({ summary: 'Obtener el total de platos acompañantes' })
  @ApiResponse({ status: 200, description: 'Total de platos acompañantes.', type: Number })
  async getTotalSideDishes() {
    return this.statsService.getTotalSideDishes();
  }

  @Get('total-drinks')
  @ApiOperation({ summary: 'Obtener el total de bebidas' })
  @ApiResponse({ status: 200, description: 'Total de bebidas.', type: Number })
  async getTotalDrinks() {
    return this.statsService.getTotalDrinks();
  }

  @Get('most-sold-menu')
  @ApiOperation({ summary: 'Obtener el artículo del menú más vendido' })
  @ApiResponse({ status: 200, description: 'Artículo del menú más vendido.', type: String })
  async getMostSoldMenuItem() {
    return this.statsService.getMostSoldMenuItem();
  }

  @Get('most-sold-side-dish')
  @ApiOperation({ summary: 'Obtener el plato acompañante más vendido' })
  @ApiResponse({ status: 200, description: 'Plato acompañante más vendido.', type: String })
  async getMostSoldSideDish() {
    return this.statsService.getMostSoldSideDish();
  }
}
