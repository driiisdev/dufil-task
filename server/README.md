# Backend Application

## Overview
This is a backend application built with Node.js and TypeScript. The application provides APIs for user authentication, book management, and other functionalities. It uses Express as the web framework and Sequelize as the ORM for PostgreSQL.

## Features
- **Authentication**: User registration, login, and token-based authentication using JWT.
- **Book Management**: CRUD operations for books.
- **Validation**: Input validation using Express Validator.
- **Database**: PostgreSQL integration using Sequelize ORM.
- **Error Handling**: Centralized error handling middleware.
- **API Documentation**: Swagger for API documentation.

## API Endpoints

### Default Endpoints
- `GET /api/v1/` - Check API health

### Authentication Endpoints
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - User login
- `POST /api/v1/logout` - Logout the user
- `POST /api/v1/refresh-token` - Refresh the user access token

### Public Book Endpoints
- `GET /api/v1/books/public` - Get all public books with pagination
- `GET /api/v1/books/public/search` - Search public books by title
- `GET /api/v1/books/public/:id` - Get a specific public book

### Personal Library Endpoints
- `GET /api/v1/books` - Get all books for the authenticated user
- `POST /api/v1/books` - Create a new book
- `GET /api/v1/books/:id` - Get a specific book for the authenticated user
- `PATCH /api/v1/books/:id` - Update a book
- `DELETE /api/v1/books/:id` - Delete a book

## Folder Structure
```markdown
src/
├── config/
│   ├── config.js    // Database configuration
│   ├── config.ts    // Application configuration
│   └── db.ts        // Database connection
├── controllers/
│   ├── v1/
│   │   ├── authController.ts    // Handles authentication-related APIs
│   │   └── bookController.ts    // Handles book-related APIs
├── dtos/
│   ├── bookDTO.ts      // Data Transfer Object for books
│   └── userDTO.ts      // Data Transfer Object for users
├── middleware/
│   ├── v1/
│   │   ├── authMiddleware.ts    // Authentication middleware
│   │   ├── errorMiddleware.ts   // Centralized error handling
│   │   └── validationMiddleware.ts    // Request validation middleware
├── models/
│   ├── bookModel.ts    // Sequelize model for books
│   ├── index.ts        // Sequelize model index file
│   ├── tokenModel.ts   // Sequelize model for tokens
│   └── userModel.ts    // Sequelize model for users
├── routes/
│   ├── v1/
│   │   ├── auth/
│   │   │   └── index.ts      // Routes for authentication APIs
│   │   ├── book/
│   │   │   └── index.ts      // Routes for book APIs
│   │   └── index.ts    // Main route file
├── seeders/
│   │   └── 20250127225110-create-user.js
├── migrations/
│   │   ├── 20250121120901-create-users-table.js
│   │   ├── 20250122143829-create-token-table.js
│   │   └── 20250122143847-create-book-table.js
├── services/
│   ├── v1/
│   │   ├── authService.ts   // Authentication service
│   │   └── bookService.ts   // Book service
├── types/
│   ├── bookTypes.ts         // Type definitions for books
│   ├── requestTypes.ts      // Type definitions for requests
│   ├── responseTypes.ts     // Type definitions for responses
│   └── userTypes.ts         // Type definitions for users
├── utils/
│   └── validators/
│       ├── authValidator.ts     // Validation logic for authentication
│       └── bookValidators.ts    // Validation logic for books
├── app.ts     // Main application file
├── server.ts     // Server entry point
│
├ tests/ (empty dir)
├ env_example             // Example environment variables file
├ .sequelizerc             // Sequelize configuration file
├ docker-compose.yml       // Docker Compose configuration
└  Dockerfile               // Dockerfile for containerization
```

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file based on `env_example` and configure the environment variables.
4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. Open the API in your browser or API client at [http://localhost:8080](http://localhost:8080).

## Scripts
- **`npm install`**: Installs dependencies.
- **`npx sequelize-cli db:migrate`**: Runs database migrations.
- **`npm run dev`**: Starts the development server with Nodemon.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Starts the production server.

## Dependencies
Key dependencies include:
- **Express**: Web framework for building APIs.
- **Sequelize**: ORM for database interactions.
- **jsonwebtoken**: JWT implementation for authentication.
- **bcrypt**: Password hashing.
- **express-validator**: Input validation.
- **pg**: PostgreSQL client.

## DevDependencies
Key development dependencies include:
- **TypeScript**: Static typing.
- **Nodemon**: Hot-reloading for development.
- **Sequelize CLI**: Database migrations and seeding.
- **@types/***: Type definitions for Node.js, Express, and other packages.

## Configuration
### Environment Variables
The application uses environment variables for configuration. Refer to `env_example` for the required variables.

### Database
The database configuration is managed in `src/config/config.ts`.

### Swagger API Documentation
API documentation is generated using Swagger. Access it at [http://localhost:8080/api-docs](http://localhost:8080/api-docs) when the server is running.

## Docker Setup
1. Build the Docker image:
   ```bash
   docker build -t backend-app .
   ```
2. Run the application using Docker Compose:
   ```bash
   docker-compose up
   ```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](../LICENSE).
