import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    example: 10,
  })
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}