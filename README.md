# Dufil Task - Library Management App

Dufil Task is a library management application designed to help manage books, users, and related resources. The project is split into two main parts: **client** for the user interface and **server** for the backend API.

## User Stories

### Public Access (Non-User)
- A non-registered user should be able to:
  - View public books on the home page.
  - Search for public books.
  - View details of a specific public book.

### Authenticated User
- A registered user should be able to:
  - Perform all actions available to non-users.
  - Access a personal dashboard after signing in.
  - See a list of their own books on the dashboard.
  - View details of a specific book they own.
  - Create a new book entry.
  - Update an existing book.
  - Delete a book they own.

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
