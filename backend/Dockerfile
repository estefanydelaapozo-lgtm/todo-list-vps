FROM node:20-alpine

WORKDIR /app

# Copiamos primero solo los archivos de dependencias para aprovechar
# la caché de Docker: si package.json no cambia, no se reinstala nada.
COPY package*.json ./
RUN npm install --production

# Copiamos el resto del código del backend
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]