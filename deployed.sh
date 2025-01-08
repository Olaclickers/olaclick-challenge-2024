#!/bin/bash

# Nombre del contenedor de Laravel
CONTAINER_NAME="olaclick-challenge-2024-server-1"

# Subir los servicios con Docker Compose
echo "Iniciando los servicios con Docker Compose..."
docker compose up -d --build

# Esperar a que el contenedor esté listo
echo "Esperando a que el contenedor $CONTAINER_NAME esté listo..."
until [ "$(docker inspect -f {{.State.Running}} $CONTAINER_NAME 2>/dev/null)" == "true" ]; do
    sleep 1
done

echo "El contenedor $CONTAINER_NAME está listo."

echo "Esperando a MySQL..."
sleep 10

# Ejecutar migraciones dentro del contenedor
echo "Ejecutando migraciones en el contenedor $CONTAINER_NAME..."
docker exec -it $CONTAINER_NAME php artisan migrate --force
docker exec -it $CONTAINER_NAME php artisan db:seed --force

# Confirmación final
echo "Migraciones ejecutadas correctamente."