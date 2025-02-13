import { Controller, Get, Post, Patch, Param, Body, NotFoundException, Inject, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/create-order.dto';
import { PageOptionsDto } from 'src/common/paginate/page-options.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  async getActiveOrders(
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.ordersService.getActiveOrders(pageOptionsDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Patch(':id/estado')
  async updateOrderStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    const updatedOrder = await this.ordersService.updateOrderStatus(id,  updateOrderStatusDto);
    if (!updatedOrder) throw new NotFoundException('Orden no encontrada');

    return updatedOrder;
  }
}
