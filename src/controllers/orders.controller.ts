import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { CreateOrderDto } from 'src/models/order/dtos/create-order.dto';
import { OrdersService } from 'src/services/orders.service';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body('status') status: string) {
    await this.ordersService.updateStatus(id, status);
    return { message: 'Estado actualizado correctamente.' };
  }
}