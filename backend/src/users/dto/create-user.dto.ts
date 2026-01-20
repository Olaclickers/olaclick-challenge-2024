// src/users/dto/create-user.dto.ts
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, Length, IsUUID, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @ApiProperty({
    description: 'Documento de identificación del usuario (DNI)',
    example: '12345678',
  })
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  @IsString({ message: 'El DNI debe ser una cadena de texto.' })
  @Length(8, 50, { message: 'El DNI debe tener entre 8 y 50 caracteres.' })
  dni: string;

  @ApiProperty({
    description: 'Nombre del usuario.',
    example: 'Juan',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
  first_name: string;

  @ApiProperty({
    description: 'Apellido del usuario.',
    example: 'Pérez',
  })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres.' })
  last_name: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario.',
    example: '+54 9 11 2345 6789',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @Transform(({ value }) => (value.trim() === '' ? undefined : value.replace(/\s+/g, '')))
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'El teléfono es obligatorio, debe contener mínimo 6 dígitos, máximo 20 y deben ser números válidos.',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  phone: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario.',
    example: 'juan.perez@dominio.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario para el acceso.',
    example: 'juanperez',
  })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @Length(3, 20, { message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.' })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario.',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres.' })
  password: string;

  @ApiProperty({
    description: 'Estado de la cuenta del usuario (activo/inactivo).',
    example: true,
    required: false,
  })
  @IsBoolean({ message: 'El estado debe ser un valor booleano.' })
  @IsNotEmpty({ message: 'El estado de la cuenta es obligatorio.' })
  @IsOptional()
  active: boolean;

  @ApiProperty({
    description: 'ID del rol asociado al usuario. Puede ser un GUID de la tabla de roles.',
    example: 'f9c8d8bc-8cf9-4d5b-8ef6-019f429eeb24',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', { message: 'El ID del rol debe ser un UUID válido.' })
  role_id: string;
}
