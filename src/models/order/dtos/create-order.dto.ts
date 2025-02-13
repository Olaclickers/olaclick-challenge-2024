import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Pollo a la brasa',
    description: 'Detalle de la orden',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre del cliente',
  })
  @IsString()
  @IsNotEmpty()
  customer: string;

  @ApiProperty({
    example: 120.00,
    description: 'Total en dólares',
  })
  @IsNumber()
  @Min(0)
  total: number;
}