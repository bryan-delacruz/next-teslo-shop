# Descripción


## Correr en Dev

1. Clonar el repositorio
2. Crear una coía del ```.env.template``` y renombrarlo a ```.env``` y camibar las variables de entorno
3. Instalar las dependeicias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Actualizar la variable de entorno AUTH_SECRET con el valor que nos devuelva al ejecutar este comando ```openssl rand -base64 32```
8. Correr el proyecto ```npm run dev```


## Correr en Prod