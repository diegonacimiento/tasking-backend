# tasking-backend
API REST con Express.js conectada a base de datos PostgreSQL mediante contenedor de Docker. Permite crear, leer, actualizar y borrar tareas y también usuarios. Cuenta además con autorización y autenticación mediante JWT y Passport.js para una experiencia segura

# Clonación del proyecto
En primer hay que clonar el proyecto en el directorio que desees
´git clone https://github.com/diegonac/tasking-backend.git´

# Docker
Es necesario tener instalado Docker [descargar Docker](https://www.docker.com/products/docker-desktop/)

Una vez instalado debemos abrir Docker y dejarlo abierto

En el archivo docker.compose-yml configuramos un usuario y contraseña:
´version: '3.3'
services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=tasking
      - POSTGRES_USER=diego #podés poner tu nombre
      - POSTGRES_PASSWORD=1234admin #debes elegir una contraseña
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com #ponemos un correo cualquiera
      - PGADMIN_DEFAULT_PASSWORD=root #ponemos una contraseña
    ports:
      - 5050:80´

# Instalación de dependencias
´npm install´

# Variables de entorno:
Se debe crear un archivo .env y agregar tus variables de entorno con la siguiente sintaxis:
´
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
´

Para las variables:
Las que empiezan con POSTGRES debemos poner lo datos que pusimos en el archivo docker-compose.yml

POSTGRES_URL: la url se arma de la siguiente manera postgres://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_HOST:POSTGRES_PORT/POSTGRES_NAME

API_KEY: debemos establecer nosotros una clave a elección

Debemos tener nuestra cuenta de google vinculada con nuestro teléfono y nuestro número de teléfono. Y en “administrar cuenta” ⇒ seguridad ⇒ acceso a google debemos tener hecho la opción de “verificación en 2 pasos”
Luego entramos en “contraseña de aplicaciones y agregamos a ‘NodeApp’”
GGMAIL: aquí ponemos el email con el cual generamos la contraseña de aplicación
GGKEY: aquí ponemos la contraseña generada, no la compartas con nadie!

JWT_SECRET y JWT_SECRET_RECOVERY: también debemos establecer una clave, lo podemos hacer con el siguiente link (generar clave)[https://keygen.io/#fakeLink]. Debemos generar claves diferentes para cada variable

# Iniciar contenedor en Docker
´
docker-compose up -d postgres
docker-compose up -d pgadmin
´
# Iniciar proyecto
´npm run dev´

