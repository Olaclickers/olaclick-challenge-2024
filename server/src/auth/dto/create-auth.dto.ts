import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidationArguments } from 'class-validator';
import { I18nMessageHelper } from 'src/i18n/i18n-message.helper';

export class CreateAuthDto {
  @ApiProperty({
    example: 'joe@gmail.com',
    required: true
})
@MaxLength(50, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.MAX_LENGTH_50_EMAIL') })
@IsEmail({}, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.VALID_FORMAT_EMAIL') })
@IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.REQUIRED_EMAIL') })
email: string;

@ApiProperty({
    example: '@Secret1234',
    required: true
})
@Matches(/((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.COMPLEX_PASSWORD') })
@MinLength(8, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.MIN_LENGTH_8_PASSWORD') })
@IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.STRING_PASSWORD') })
@IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.REQUIRED_PASSWORD') })
password: string;
}

export class TokenDto {
@ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0YTAyNjk2LTdhMWEtNDdlMC1hOTQxLWFkM2YwODEwNWFiZCIsImVtYWlsIjoiZGV2bW9uazExMkBnbWFpbC5jb20iLCJyb2xfaWQiOjEsImlhdCI6MTcxODcyOTY4NywiZXhwIjoxNzE5NTM2MDg3fQ.PeilWWAcQabaQ08LhfCu_G6zBZ1Se2FJahX5X_hXNJ8',
    required: true
})
@IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.REQUIRED_TOKEN') })
@IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.STRING_TOKEN') })
token: string;
}
