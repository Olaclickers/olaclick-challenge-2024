import { BadRequestException } from '@nestjs/common';

export interface IErrorDTO {
    field: string,
    errorMessage: string | any[],
}
export class ValidationException extends BadRequestException {
    constructor(public validationErrors: IErrorDTO[]) {
        super();
    }
}