import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API de NestJS')
    .setVersion('1.0')
    .addTag('Users', 'Users es la entidad central encargada de modelar y gestionar la información de los usuarios del sistema.')
    .addTag('Client', 'Client es la entidad central encargada de modelar y gestionar la información de los Cliente del sistema.')
    .addTag('Menús', 'Menús es la entidad central encargada de modelar y gestionar la información del menu del sistema.')
    .addTag('Side-Dishes', 'Side-Dishes es la entidad central encargada de modelar y gestionar los Acompañamientos del menu del sistema.')
    .addTag('Drinks', 'Drinks es la entidad central encargada de modelar y gestionar las bebidas del menu del sistema.')
    .addTag('Sales', 'Sales es la entidad central encargada de modelar y gestionar las ventas del sistema.')
    .addTag('Orders', 'Orders es la entidad central encargada de modelar y gestionar las ordenes del sistema.')
    .addTag('Auth', 'Auth es la entidad central encargada de modelar y gestionar la autenticación del sistema.')
    .addTag('Stats', 'Stats es la entidad central encargada de modelar y gestionar las Estadísticas del sistema.')
    .addBearerAuth() // Para autenticación con JWT
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document); // 'api' es el endpoint donde estará disponible Swagger
}
