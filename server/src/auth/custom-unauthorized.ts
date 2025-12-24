import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(
    method: string,
    endpoint: string,
    errorMessage?: string
  ) {
    super(
        {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
            method: method,
            endpoint: endpoint,
            errorDescription: 'UnauthorizedException',
            validationErrors: [
                {
                    "field": "token",
                    "errorMessage": errorMessage? errorMessage : "Invalid or not provided authentication token"
                }
            ]
          },
    
      
    );
  }
}
