# API de Cursos

Esta es una API simple que permite manejar cursos en una base de datos MongoDB.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar las dependencias:**

   Ejecuta el siguiente comando en la raíz del proyecto para instalar los paquetes de Node.js necesarios:

   ```bash
   npm install
   ```

## Configuración

1. **Crear el archivo `.env`:**

   En la raíz del proyecto, crea un archivo llamado `.env` y configura las siguientes variables de entorno:

   ```bash
   BD_CONNECTION_STRING='mongodb://localhost:27017'
   DB_NAME='miBaseDeDatos'
   ```

   - `BD_CONNECTION_STRING`: La URL de conexión a tu instancia de MongoDB.
   - `DB_NAME`: El nombre de la base de datos que deseas utilizar.

## Uso

1. **Iniciar el servidor en modo desarrollo:**

   Ejecuta el siguiente comando para iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   Esto iniciará el servidor con recarga automática cuando se detecten cambios en el código.

2. **Iniciar el servidor en modo producción:**

   Para iniciar el servidor en modo producción, utiliza:

   ```bash
   npm run start
   ```

   Esto iniciará el servidor sin recarga automática.

## Rutas

- **GET `/api/cursos`**: Retorna todos los cursos de matemáticas y programación.

## Ejemplo de Uso

Puedes usar herramientas como [Postman](https://www.postman.com/) o [curl](https://curl.se/) para interactuar con la API. Por ejemplo, para obtener los cursos disponibles:

```bash
curl http://localhost:3000/api/cursos
```

## Licencia

Este proyecto está bajo la [MIT License](https://opensource.org/licenses/MIT).
