import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './common/constants/cors';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/exceptions/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import * as morgan from 'morgan';
import { setupSwagger } from './common/swagger/swagger.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  const configService = app.get(ConfigService); // Obtiene el servicio de configuración de la aplicación
  const PORT = configService.get('PORT');

  app.use(morgan('dev'));

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  app.setGlobalPrefix('api');
  await app.listen(PORT, '0.0.0.0', async () => {
    logger.log('Listening in port:' + `${await app.getUrl()}`);
  });
}
bootstrap();
