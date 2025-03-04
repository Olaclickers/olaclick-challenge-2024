import { HttpException } from '@nestjs/common';
import { statusCodes } from 'src/common/utils/statusCodesLibreary';

export function createCustomException(message: string, statusCode: number, path: string) {
  class CustomException extends HttpException {
    constructor() {
      super(
        {
          message,
          error: `ERROR_${path.toUpperCase()}_${statusCodes[statusCode]}`,
          statusCode,
        },
        statusCode,
      );
    }
  }
  throw new CustomException();
}
