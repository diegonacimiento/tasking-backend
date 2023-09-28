# tasking-backend
Bienvenido a la documentación del backend de Tasking, donde encontrarás información esencial sobre cómo configurar y utilizar mi API REST construida con Express.js. Esta API está diseñada para funcionar perfectamente con una base de datos PostgreSQL en un contenedor Docker. Tasking te permite realizar tareas como crear, leer, actualizar y eliminar tanto tareas como usuarios. También proporciona una sólida autorización y autenticación a través de JWT y Passport.js, garantizando una experiencia segura para los usuarios.

***

## Tabla de contenidos
- [Clonación del proyecto](#clonación-del-proyecto)
- [Configuración de Docker](#configuración-de-docker)
- [Instalación de dependencias](#instalación-de-dependencias)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución de contenedores Docker](#ejecución-de-contenedores-docker)
- [Inicio del proyecto](#inicio-del-proyecto)

***

## Clonación del proyecto
Para comenzar, deberás clonar el repositorio del proyecto en el directorio de tu elección. Usa el siguiente comando:

```git clone https://github.com/diegonacimiento/tasking-backend.git```

***

## Configuración de Docker
Tasking depende de Docker para la contenerización. Si aún no lo has hecho, por favor  [descarga e instala Docker](https://www.docker.com/products/docker-desktop/). Una vez instalado Docker, asegúrate de que esté en funcionamiento.

En el archivo "docker.compose-yml", encontrarás configuraciones para establecer un contenedor PostgreSQL con ajustes de usuario y contraseña. Aquí tienes un ejemplo:
```javascript
´version: '3.3'
services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=tasking
      - POSTGRES_USER=diego # Puedes usar tu nombre
      - POSTGRES_PASSWORD=1234admin # Elige una contraseña
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com # Usa cualquier correo
      - PGADMIN_DEFAULT_PASSWORD=root # Establece una contraseña
    ports:
      - 5050:80´
```

***

## Instalación de dependencias
Para instalar las dependencias necesarias, ejecuta el siguiente comando:

``` npm install ```

***

## Variables de entorno
Tasking depende de algunas variables de entorno. Deberás crear un archivo ".env" en el directorio raíz del proyecto y definir estas variables. Aquí tienes un ejemplo de un archivo ".env" con explicaciones:
```
PORT=3000
POSTGRES_USER="diego" 
POSTGRES_PASSWORD="1234admin"
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_NAME="tasking"
POSTGRES_URL="postgres://diego:1234admin@localhost:5432/tasking"
API_KEY=""
GGMAIL=""
GGKEY=""
JWT_SECRET=""
JWT_SECRET_RECOVERY=""
```

- Las variables que comienzan con POSTGRES deben coincidir con los datos especificados en el archivo "docker-compose.yml".

- Para POSTGRES_URL, sigue este formato: postgres://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_HOST:POSTGRES_PORT/POSTGRES_NAME.

- Debes establecer tu propia API_KEY.

- JWT_SECRET y JWT_SECRET_RECOVERY deben tener claves únicas. Puedes generarlas [aquí](https://keygen.io/#fakeLink/)

#### Envío de email

Para configurar el envío de correos electrónicos, asegúrate de tener una cuenta de Google vinculada a tu número de teléfono y tener la verificación en dos pasos activada en "Administrar cuenta" ⇒ "Seguridad" ⇒ "Acceso a Google". Luego, ve a "Contraseñas de aplicaciones" y agrega 'NodeApp'.

- GGMAIL: Utiliza el correo electrónico con el que generaste la contraseña de la aplicación.

- GGKEY: Utiliza la contraseña generada; no la compartas con nadie.

***

# Ejecución de contenedores Docker
Para iniciar los contenedores Docker de PostgreSQL y PGAdmin, usa los siguientes comandos:

```
docker-compose up -d postgres
docker-compose up -d pgadmin
```

***

# Inicio del proyecto
Para iniciar el proyecto, utiliza el siguiente comando:

```npm run dev```

Este comando iniciará la API y podrá comenzar a usarla según lo previsto.

***

Esta documentación debería proporcionarle la información necesaria para configurar y utilizar tasking-backend. Si tiene más preguntas o encuentra problemas, no dude en solicitar ayuda.

