# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
