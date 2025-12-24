import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ValidationException } from './ValidationException';
import { MulterError } from 'multer';

@Catch(ValidationException, HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException | HttpException | MulterError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = exception instanceof MulterError ? 422 : exception.getStatus();
    const method = request.method;
    const endpoint = request.url;

    let responseErr = {
      status,
      message: 'Bad Request',
      method,
      endpoint,
      errorDescription: exception.name,
    };

    if (exception instanceof ValidationException) {
      responseErr['validationErrors'] = exception.validationErrors;
      responseErr['message'] = 'Conflict Request';
      responseErr['status'] = 409;
    }

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;

      if (exception instanceof ValidationException) {
        responseErr['validationErrors'] = exception.validationErrors;
        responseErr['message'] = 'Conflict Request';
        responseErr['status'] = 409;
      } else if (exceptionResponse?.errorDescription === 'ValidationException') {
        responseErr = { ...exceptionResponse, endpoint };
      } else if (Array.isArray(exceptionResponse?.message)) {
        responseErr['validationErrors'] = exceptionResponse.message.map(error => ({
          field: '',
          errorMessage: error,
        }));
      }
    }

    const resErr = this.errorToJSON(responseErr);
    response.status(responseErr.status).json(resErr);
  }

  errorToJSON(resErr?) {
    return {
      status: resErr?.status,
      message: resErr?.message,
      method: resErr?.method,
      endpoint: resErr?.endpoint,
      errorDescription: resErr?.errorDescription,
      validationErrors: resErr?.validationErrors,
    };
  }
}
