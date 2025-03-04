import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID de la orden asociada a la venta', example: 'd5b537ac-4b36-4e2d-b7bc-4186d21c4a7f' })
  @IsNotEmpty({ message: 'El ID de la orden es obligatorio.' })
  @IsUUID('4', { message: 'El ID de la orden debe ser un UUID válido.' })
  order_id: string;
}

export class GetSalesDto {
  @ApiPropertyOptional({ description: 'Fecha de inicio del rango de ventas', example: '2025-03-01T00:00:00Z' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida en formato ISO 8601.' })
  start_date?: string;

  @ApiPropertyOptional({ description: 'Fecha de fin del rango de ventas', example: '2025-03-02T00:00:00Z' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida en formato ISO 8601.' })
  end_date?: string;
}
