import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
