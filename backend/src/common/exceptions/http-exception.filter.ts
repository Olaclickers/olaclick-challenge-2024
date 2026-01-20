import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as { message?: string | string[]; error?: string };

        // Caso de errores de validación (de DTO, etc.)
        if (Array.isArray(responseObj.message)) {
          errorResponse = {
            message: responseObj.message, // Mantenemos el array de mensajes
            error: `ERROR_BAD_REQUEST`, // Código de error común para validaciones
            statusCode: status,
          };
        } else {
          // Caso de errores específicos de servicio, un solo mensaje
          errorResponse = {
            message: responseObj.message ? responseObj.message : 'Unknown error', // Mensaje único
            error: `${responseObj.error?.toUpperCase().replace(/\s+/g, '_') || 'SERVICE_ERROR'}`, // Generamos un código de error
            statusCode: status,
          };
        }
      } else {
        // Si el mensaje de error no es un objeto, lo tratamos como string
        errorResponse = {
          message: [exceptionResponse],
          error: `ERROR_UNKNOWN`, // Error genérico si no se conoce el tipo
          statusCode: status,
        };
      }
    } else {
      // Error no manejado
      errorResponse = {
        message: ['Internal Server Error'],
        error: `ERROR_INTERNAL_SERVER`,
        statusCode: status,
      };
    }

    this.logger.error(`Status: ${status} Error: ${JSON.stringify(errorResponse)}`);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorResponse,
    });
  }
}
