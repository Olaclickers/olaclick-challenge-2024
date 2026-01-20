import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import Sales from './models/sale.model';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({ status: 201, description: 'La venta ha sido creada correctamente.', type: Sales })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta. Errores de validación.' })
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener ventas por rango de fechas' })
  @ApiQuery({ name: 'start_date', required: true, description: 'Fecha de inicio del rango (formato: YYYY-MM-DD)', type: String })
  @ApiQuery({ name: 'end_date', required: true, description: 'Fecha de fin del rango (formato: YYYY-MM-DD)', type: String })
  @ApiResponse({ status: 200, description: 'Ventas en el rango de fechas especificado.', type: [Sales] })
  async getSalesByDateRange(@Query('start_date') startDate: string, @Query('end_date') endDate: string): Promise<Sales[]> {
    const start = new Date(startDate); // Convertir a Date
    const end = new Date(endDate); // Convertir a Date
    return this.salesService.findAllByDateRange(start, end);
  }

  @Get('today')
  @ApiOperation({ summary: 'Obtener las ventas de hoy' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiResponse({ status: 200, description: 'Las ventas de hoy.', type: [Sales] })
  findToday(@Query() paginationDto: PaginationDto) {
    return this.salesService.findToday(paginationDto);
  }
}
