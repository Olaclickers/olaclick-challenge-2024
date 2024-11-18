# Proyecto API de Ordenes

## Descripción

Este proyecto es una API RESTful que gestiona órdenes, productos (ítems) y usuarios. Está construido en Laravel y utiliza Docker para la configuración del entorno. La API ofrece diversos endpoints para interactuar con los datos de órdenes y productos.

## Requisitos

- Docker
- PHP 8.2
- Composer
- Laravel Framework 11.31.0

## Instalación y Ejecución

# Guía para Levantar un Proyecto Docker en Laravel

Esta guía te llevará a través del proceso para levantar un proyecto Laravel utilizando Docker, ejecutar los seeds y realizar pruebas con PHPUnit.

## Paso 1: Hacer el Build del Contenedor Docker

Primero, asegúrate de tener Docker instalado en tu máquina. Si ya lo tienes, navega hasta la raíz de tu proyecto Laravel donde está el archivo `docker-compose.yml`.

##### Ejecuta el siguiente comando para construir las imágenes de Docker:

```bash

docker-compose build
docker compose up 

```


#### Luego crear la db, las migraciones  en el container por bash y correr los seeds 
#### Nota: Para ejecutar esto necesitas entrar en el container
```bash

php artisan migrate:refresh --seed
```

##### Ejecutar los specs , tambien puedes visualizarlos , se probo el controller y los modelos 
```bash

./vendor/bin/phpunit tests
```


### Abordar situaciones de gran volumen de datos

Es importante tener en cuenta que este sistema puede enfrentar situaciones de gran volumen de escrituras y lecturas simultáneas. Para abordar estos requisitos, se han implementado varias estrategias:

    Uso de Cache: Las consultas frecuentes se cachean para evitar consultas innecesarias a la base de datos. Esto mejora el rendimiento del sistema y reduce la carga en el servidor de base de datos.

    Encolamiento de Solicitudes (en desarrollo): Aunque no se implementó por falta de tiempo y porque la fecha limite del reto me gano, el encolamiento de solicitudes es una estrategia que permitiría procesar las operaciones de manera asíncrona. Esto ayudaría a soportar una carga más alta, evitando bloqueos y mejorando la escalabilidad. El encolamiento de solicitudes permite que los trabajos se procesen en segundo plano, mejorando el rendimiento general.


