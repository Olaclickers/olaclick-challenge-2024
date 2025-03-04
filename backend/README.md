
## Prueba BackEnd Developer Node Nest


## Instalación

```bash
$ npm install
```
## Deploy
https://server-store-sob3.onrender.com
## Agregar variables de entorno .env
    PORT=3000

    # DATABASE
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=1489
    DB_NAME=olaclickdb

    # AUTH
    HASH_SALT=10
    JWT_SECRET=mysecret
    JWT_EXPIRE=7d

    # Redis
    REDIS_HOST=redis
    REDIS_PORT=6379
## Docker
  ``docker-compose build`` para construir la imagen de tu aplicación.

  ``docker-compose up`` para levantar los servicios.

## Documentacion Swagger
### inicia el servidor en el puerto 3000
http://localhost:3000/api/docs


## Excepciones
### Manejos de ``exepciones`` personalizadas
### Request CustomException
````
import { createCustomException } from 'src/common/exceptions/exceptionsGenerator';

if (userFound) {
      throw createCustomException(
        'El mensage para mostrar',
        409,
        'User',
      );
    }
````
### Response CustomException
````
{
    "timesstamps": "2024-04-21T18:43:38.308Z",
    "path": "/api/user",
    "error": {
        "message": "El mensage para mostrar",
        "error": "ERROR_USER_CONFLICTC",
        "statusCode": 409
    }
}
````
## Ejemplos de optimizacion de los endpoint
````
[POST]--> api/controller/create
[GET]--> api/controller/all
[GET]--> api/controller/:id
[UPDATE]--> api/controller/edit/:id
[PATCH]--> api/controller/edit/:id
[DELETE]--> api/controller/delete/:id
````
## Ejecutando la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Soporte
- Author - [Edwar Castillo](https://github.com/edcastillob)

