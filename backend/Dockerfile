# 1. Usamos una imagen ligera de Node.js
FROM node:18-alpine

# 2. Creamos el directorio de trabajo
WORKDIR /app

# 3. Copiamos los archivos de dependencias primero
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. Exponemos el puerto
EXPOSE 3000

# 7. Comando para arrancar
CMD ["npm", "start"]