import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';


import { AppModule } from './app.module';
import { CORS } from './common';
import { ValidationFilter } from './config/exeptions/DTOManagerErrors';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Obtiene el servicio de configuración de la aplicación
  const PORT = configService.get('PORT'); // Obtiene el valor de configuración del puerto en el que se ejecutará la aplicación
  const reflector = app.get(Reflector);

  // app.useGlobalFilters(new AllExceptionFilter());
  // app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)); // Excluye la password de las solicitudes
  
  app.useGlobalFilters(new ValidationFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors(CORS);

  app.setGlobalPrefix('api'); // para manejar las versiones

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Restaurant Management API')
  .setDescription(
    'API para la gestión de órdenes en un restaurante. Permite visualizar, actualizar y gestionar el estado de las órdenes de los clientes.',
  )
  .setVersion('1.0')
  .addTag('Orders', 'Operaciones relacionadas con las órdenes del restaurante')
  .addTag('Customers', 'Gestión de clientes y sus órdenes')
  .addTag('Menu', 'Administración del menú del restaurante')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, '0.0.0.0', async () => {
    logger.log('Listening in port:' + `${await app.getUrl()}`);
  });
}
bootstrap();
