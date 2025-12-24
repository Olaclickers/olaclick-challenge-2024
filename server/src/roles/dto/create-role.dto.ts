import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength, ValidationArguments } from "class-validator";
import { I18nMessageHelper } from "src/i18n/i18n-message.helper";
import { ROLES_TYPE } from "../types/role.type.enum";

export class CreateRoleDto {
    @ApiProperty({
        example: 'CHW',
        required: true
    })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_STRING', { args: { property: 'rol' } }) })
    @MaxLength(100, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MAX_LENGTH', { args: { property: 'rol', max: '100' } }) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.NOT_EMPTY', { args: { property: 'rol' } }) })
    rol: string;

    @ApiProperty({
        example: "USER_ROLE",
        required: true
    })
    @IsEnum(ROLES_TYPE, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.ROL_ENUM') })
    @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_STRING', { args: { property: 'role_type' } }) })
    @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.NOT_EMPTY', { args: { property: 'role_type' } }) })
    role_type: ROLES_TYPE;
}

