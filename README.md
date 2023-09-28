# tasking-backend
Welcome to the Tasking backend documentation, where you will find essential information on how to set up and use my REST API built with Express.js. This API is designed to work seamlessly with a PostgreSQL database in a Docker container. Tasking allows you to perform tasks such as creating, reading, updating, and deleting tasks and users. It also provides robust authorization and authentication through JWT and Passport.js, ensuring a secure user experience.

[Documentación en español](README-es.md)

***

## Table of contents
- [Clone the project](#clone-the-project)
- [Docker setup](#docker-setup)
- [Dependency installation](#dependency-installation)
- [Environment variables](#environment-variables)
- [Running Docker containers](#Running-Docker-containers)
- [Starting the project](#Starting-the-project)

***

## Clone the project
To get started, you'll need to clone the project repository into your desired directory. Use the following command:

```git clone https://github.com/diegonacimiento/tasking-backend.git```

***

## Docker setup
Tasking relies on Docker for containerization. If you haven't already, please [download and install Docker](https://www.docker.com/products/docker-desktop/). Once Docker is installed, ensure that it's running.

In the "docker.compose-yml" file, you'll find configurations for setting up a PostgreSQL container with user and password settings. Here's an example:

```javascript
´version: '3.3'
services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=tasking
      - POSTGRES_USER=diego # You can use your name
      - POSTGRES_PASSWORD=1234admin # Choose a password
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com # Use any email
      - PGADMIN_DEFAULT_PASSWORD=root # Set a password
    ports:
      - 5050:80´
```

***

## Dependency installation
To install the necessary dependencies for Tasking, run the following command:

``` npm install ```

***

## Environment variables
Tasking relies on some environment variables. You should create a ".env" file in the project's root directory and define these variables. Here's an example of a ".env" file with explanations:
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

- The variables starting with POSTGRES should match the data specified in the "docker-compose.yml" file.

- For POSTGRES_URL, follow this format: postgres://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_HOST:POSTGRES_PORT/POSTGRES_NAME.

- You should set your own chosen API_KEY.

- JWT_SECRET and JWT_SECRET_RECOVERY should have unique keys. You can generate them [here](https://keygen.io/#fakeLink/).

#### Email sending
To configure email sending, ensure you have a Google account linked to your phone number and 2-Step Verification enabled in "Account Management" ⇒ "Security" ⇒ "Google Access." Then, go to "App Passwords" and add 'NodeApp.'

- GGMAIL: Use the email for which you generated the application password.

- GGKEY: Use the generated password; do not share it with anyone.

***

# Running Docker containers
To start the Docker containers for PostgreSQL and PGAdmin, use the following commands:

```
docker-compose up -d postgres
docker-compose up -d pgadmin
```

***

# Starting the project
To start the project, use the following command:

```npm run dev```

This command will launch the API, and you can begin using it as intended.

***

This documentation should provide you with the necessary information to set up and use Tasking-Backend. If you have more questions or encounter issues, feel free to request assistance.

