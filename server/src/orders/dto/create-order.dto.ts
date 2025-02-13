import { IsString, IsNotEmpty, IsEnum, IsArray, ArrayMinSize, IsNumber, Min, ValidationArguments } from 'class-validator';
import { I18nMessageHelper } from 'src/i18n/i18n-message.helper';

enum OrderStatus {
  INICIADO = 'iniciado',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
}

export class CreateOrderItemDto {
  @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.FIRST_NAME_STRING', args) })
  @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
  descripcion: string;

  @IsNumber({},{ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_NUMBER', args) })
  @Min(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
  cantidad: number;

  @IsNumber({},{ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_NUMBER', args) })
  @Min(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
  costoUnitario: number;

  @IsNumber({},{ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_NUMBER', args) })
  @Min(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
  costoTotal: number;
}

export class CreateOrderDto {
  @IsString({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTO.FIRST_NAME_STRING') })
  @IsNotEmpty({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_REQUIRED', args) })
  cliente: string;

  @IsEnum(OrderStatus)
  estado: OrderStatus;

  @IsNumber({},{ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_NUMBER', args) })
  @Min(3, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.MIN_LENGTH', args) })
  total: number;

  @IsArray({ message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_ARRAY', args) })
  @ArrayMinSize(1)
  items: CreateOrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, { message: (args: ValidationArguments) => I18nMessageHelper.getMessage('lang.DTOS.IS_ENUM', {args}) })
  // @IsEnum(OrderStatus, { message: 'El estado debe ser "iniciado", "enviado" o "entregado"' })
  estado: OrderStatus;
}