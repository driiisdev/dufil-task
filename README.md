# Dufil Task - Library Management App

Dufil Task is a library management application designed to help manage books, users, and related resources. The project is split into two main parts: a **client** for the user interface and a **server** for the backend API.

## Features

- **Book Management**: Users can add, update, and delete books from the library.
- **User Management**: Handle users with different roles for managing the library content.
- **Dockerized**: The client and server are both Dockerized for easy deployment and local development.

## Setup

### Client

1. Navigate to the `client/` directory.
2. Follow the instructions in the `README.md` to set up and run the client.
3. Use the provided `docker-compose.yml` and `Dockerfile` to build and run the client in a containerized environment.

### Server

1. Navigate to the `server/` directory.
2. Follow the instructions in the `README.md` to set up and run the server.
3. Use the provided `docker-compose.yml` and `Dockerfile` to build and run the server in a containerized environment.

### Docker Compose (for both client and server)

- The `docker-compose.yml` file in both the `client/` and `server/` directories includes necessary configurations to get up and running quickly.

## License

This project is licensed under the terms specified in the `license` file.
