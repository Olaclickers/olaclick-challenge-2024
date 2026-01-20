import { ApiProperty } from '@nestjs/swagger'; import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidationArguments } from 'class-validator'; 

export class CreateAuthDto { 
  @ApiProperty({ example: 'joe@gmail.com', required: true }) 
  @MaxLength(50, { message: 'El correo electrónico no puede exceder los 50 caracteres.' }) 
  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' }) 
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' }) 
  email: string; 

  @ApiProperty({ example: '@Secret1234', required: true }) 
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }) 
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' }) 
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' }) 
  password: string; 
}

export class TokenDto { 
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0YTAyNjk2LTdhMWEtNDdlMC1hOTQxLWFkM2YwODEwNWFiZCIsImVtYWlsIjoiZGV2bW9uazExMkBnbWFpbC5jb20iLCJyb2xfaWQiOjEsImlhdCI6MTcxODcyOTY4NywiZXhwIjoxNzE5NTM2MDg3fQ.PeilWWAcQabaQ08LhfCu_G6zBZ1Se2FJahX5X_hXNJ8', required: true }) 
  @IsNotEmpty({ message: 'El token es obligatorio.' }) 
  @IsString({ message: 'El token debe ser una cadena de texto.' }) 
  token: string; 
}
