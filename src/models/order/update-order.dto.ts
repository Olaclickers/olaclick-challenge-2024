import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}