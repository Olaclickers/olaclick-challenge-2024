import { HttpException, HttpStatus } from '@nestjs/common';
import { getStatus } from './CustomStatus';


export class CustomHttpExceptionValidate extends HttpException {
  constructor(method: string, endpoint: string, message: string | any[], property: string, status?: number, extension?: string) {
    const { _status, _message } = getStatus(status ?? 400);
    super(
      {
        status: _status,
        message: _message,
        method: method,
        endpoint: endpoint,
        extension: extension,
        errorDescription: 'ValidationException',
        validationErrors: [
          {
            field: property,
            errorMessage: message,
          },
        ],
      } as Record<string, unknown>,
      _status
    );
  }

  toJSON() {
    return {
      response: {
        status: (this.getResponse() as any)?.status,
        method: (this.getResponse() as any)?.method,
        endpoint: (this.getResponse() as any)?.endpoint,
        extension: (this.getResponse() as any)?.extension,
        message: (this.getResponse() as any)?.message,
        errorDescription: (this.getResponse() as any)?.errorDescription,
        validationErrors: (this.getResponse() as any)?.validationErrors,
      }
    };
  }


}


