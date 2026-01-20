import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsNumber()
  totalPrice: number;

  @IsEnum(['initiated', 'sent', 'delivered'])
  @IsOptional()
  status?: 'initiated' | 'sent' | 'delivered';

  @IsString()
  @IsOptional()
  details?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsOptional()
  orderItems?: CreateOrderItemDto[];
}
