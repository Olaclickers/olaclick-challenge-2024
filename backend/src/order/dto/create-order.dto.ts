import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsUUID, IsOptional, IsInt, Min, IsEnum, IsDecimal, IsNumber } from 'class-validator';

export enum OrderStatus {
  INICIADO = 'iniciado',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
  FACTURADO = 'facturado',
}

export class CreateOrderDto {
  @ApiProperty({ example: '87654321', description: 'DNI del cliente asociado a la orden' })
  @IsString({ message: 'El DNI del cliente es obligatorio y debe ser una cadena de texto.' })
  client_dni: string;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID del menú' })
  @IsUUID('4', { message: 'El ID del menú debe ser un UUID válido.' })
  @IsOptional()
  menu_id?: string;

  @ApiPropertyOptional({ example: 2, description: 'Cantidad de menú' })
  @IsInt({ message: 'La cantidad de menú debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de menú no puede ser menor que 0.' })
  quantity_menu?: number = 0;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID del acompañante' })
  @IsUUID('4', { message: 'El ID del acompañante debe ser un UUID válido.' })
  @IsOptional()
  side_dishes_id?: string;

  @ApiPropertyOptional({ example: 1, description: 'Cantidad de acompañante' })
  @IsInt({ message: 'La cantidad de acompañante debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de acompañante no puede ser menor que 0.' })
  quantity_side_dishes?: number = 0;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'ID de la bebida' })
  @IsUUID('4', { message: 'El ID de la bebida debe ser un UUID válido.' })
  @IsOptional()
  drinks_id?: string;

  @ApiPropertyOptional({ example: 1, description: 'Cantidad de bebida' })
  @IsInt({ message: 'La cantidad de bebida debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de bebida no puede ser menor que 0.' })
  quantity_drinks?: number = 0;

  @ApiProperty({ example: 'iniciado', description: 'Estado de la orden', enum: OrderStatus })
  @IsEnum(OrderStatus, { message: 'El estado de la orden debe ser uno de los valores válidos: iniciado, enviado, entregado, cancelado, facturado.' })
  status: OrderStatus;

  @ApiPropertyOptional({ example: 25.5, description: 'Total de la orden' })
  @IsNumber({}, { message: 'El total de la orden debe ser un número.' })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value)) // Convierte la cadena a número decimal
  total?: number = 0;
}

export class UpdateOrderDto extends CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003', description: 'ID de la orden' })
  @IsUUID('4', { message: 'El ID de la orden debe ser un UUID válido.' })
  id: string;
}
