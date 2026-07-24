# To-Do List App

Proyecto para el Trabajo Practico de Despliegue Automatizado y Administracion de Servicios en VPS.

## Estructura

- `backend/` — API REST en Node.js + Express, conectada a MySQL.
- `frontend/` — SPA en HTML/CSS/JS vanilla (CRUD + filtro en tiempo real).

## Como correr el backend localmente (o en la VM)

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con los datos reales de conexion a MySQL
npm start
```

El servidor backend queda escuchando en `http://localhost:3000` (o el puerto definido en `.env`).

## Frontend

Los archivos de `frontend/` son estaticos y se sirven directamente con Nginx.
El archivo `script.js` hace peticiones a `/api/tasks`, que Nginx redirige (proxy)
hacia el backend de Node.js.
