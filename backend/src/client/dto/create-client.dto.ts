import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  @ApiProperty({
    description: 'Número de identificación del cliente.',
    example: '12345678',
    minLength: 8,
    maxLength: 50,
  })
  dni: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'Nombre del cliente.',
    example: 'Juan',
    minLength: 1,
    maxLength: 50,
  })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'Apellido del cliente.',
    example: 'Pérez',
    minLength: 1,
    maxLength: 50,
  })
  last_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => (value.trim() === '' ? undefined : value.replace(/\s+/g, '')))
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'El teléfono es obligatorio, debe contener mínimo 6 dígitos, máximo 20 y deben ser números válidos.',
  })
  @IsString()
  @ApiProperty({
    description: 'Número de teléfono del cliente.',
    example: '+5491123456789',
    pattern: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
  })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Correo electrónico del cliente.',
    example: 'cliente@dominio.com',
  })
  email: string;
}
