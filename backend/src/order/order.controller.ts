import { Controller, Get, Post, Body, Query, Put, Param, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import Order from './models/order.model';
import { Pagination } from 'src/common/pagination/pagination.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRolGuard } from 'src/auth/guards/user-role.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard, UserRolGuard)
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiResponse({ status: 201, description: 'La orden ha sido creada exitosamente.', type: Order })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta. Errores de validación.' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const user_id = req.user.id;
    return this.orderService.create(createOrderDto, user_id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener una lista de órdenes' })
  @ApiQuery({ name: 'page', required: false, description: 'El número de página para la paginación.', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'El límite de elementos por página.', type: Number })
  @ApiQuery({ name: 'status', required: false, description: 'El estado de la orden para filtrarla (opcional).', type: String })
  @ApiResponse({ status: 200, description: 'Lista de órdenes.', type: [Order] })
  findAll(@Query() paginationDto: PaginationDto, @Query('status') status?: string): Promise<Pagination<Order>> {
    return this.orderService.findAll(paginationDto, status);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Obtener las órdenes pendientes' })
  @ApiResponse({ status: 200, description: 'Órdenes pendientes.', type: [Order] })
  async findPending() {
    return await this.orderService.findPending();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por su ID' })
  @ApiParam({ name: 'id', description: 'El ID de la orden a obtener', type: String })
  @ApiResponse({ status: 200, description: 'Detalles de la orden.', type: Order })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden' })
  @ApiParam({ name: 'id', description: 'El ID de la orden a actualizar', type: String })
  @ApiBody({  description: 'La orden ha sido actualizada.', type: CreateOrderDto })
  @ApiResponse({ status: 200, description: 'La orden ha sido actualizada.'})
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta. Errores de validación.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden' })
  @ApiParam({ name: 'id', description: 'El ID de la orden a eliminar', type: String })
  @ApiResponse({ status: 200, description: 'La orden ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}
