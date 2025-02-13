import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsIn, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength, ValidateNested, ValidationArguments } from "class-validator";
import { I18nMessageHelper } from "src/i18n/i18n-message.helper";
import { USER_ROLES } from "../types/user_role_type";


export class CreateUserDto {
    @ApiProperty({
        example: 'joe@gmail.com',
        required: true
    })
    @IsEmail({}, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_EMAIL',args) })
    @MaxLength(50, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MAX_LENGTH', args) })
    // @IsUnique({ tableName: 'users', column: 'email' })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
    email: string;

    @ApiProperty({
        example: 'joe',
        required: true
    })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_STRING', args) })
    @MinLength(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
    @MaxLength(50, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MAX_LENGTH', args) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
    first_name: string;

    @ApiProperty({
        example: 'doe',
        required: true
    })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOSIS_STRING', args) })
    @MinLength(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
    @MaxLength(50, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MAX_LENGTH', args) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
    last_name: string;

    @ApiProperty({
        example: '@Secret1234',
        required: true
    })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOIS_STRING', args) })
    @MinLength(8, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
    @Matches(/((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.NO_VALID', args) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
    password: string;
}
export class UpdateUserRole{
    @ApiProperty({
        example: "CHW",
        required: true
    })
    @IsEnum(USER_ROLES, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOSS.IS_ENUM', {args}) })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOSS.IS_STRING', {args}) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOSS.IS_REQUIRED', {args}) })
    user_role: USER_ROLES;
}