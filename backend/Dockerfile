FROM node:20-alpine

WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiamos primero solo los archivos de dependencias para aprovechar
# la caché de Docker: si package.json no cambia, no se reinstala nada.
COPY package*.json ./
RUN npm install --production && \
    chown -R nodejs:nodejs /app

# Copiamos el resto del código del backend
COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]