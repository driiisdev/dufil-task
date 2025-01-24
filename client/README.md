# Dufil-Task
# Library Management - Client Application

## Overview
This is a frontend application built with React, TypeScript, and Vite. The application allows users to view public books, manage their personal book collections, and perform authentication tasks such as login and registration.

## Features
- **Authentication**: User login and registration with API integration.
- **Book Management**: View public books, manage personal book collections (CRUD operations).
- **Responsive UI**: Built using React components and TailwindCSS.
- **State Management**: Zustand for global state management.
- **Form Validation**: Yup for form validation schemas.
- **API Integration**: Axios instance with interceptors for API requests.

## Folder Structure
```markdown
src/
├── api/
│   ├── auth.ts               // Handles authentication API requests
│   ├── books.ts              // Handles book-related API requests
│   └── axiosInstance.ts      // Axios instance with base URL and interceptors
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx     // Login form component
│   │   ├── RegisterForm.tsx  // Registration form component
│   ├── Books/
│   │   ├── BookCard.tsx      // Displays book information (public and personal)
│   │   ├── BookPopup.tsx     // Popup for viewing, creating, updating, and deleting books
│   │   ├── SearchBox.tsx     // Search input box component
│   ├── Layout/
│   │   ├── Header.tsx        // Navigation bar (Home, Dashboard links, + sign button)
│   │   └── Footer.tsx        // Footer component
├── pages/
│   ├── Home.tsx              // Public books homepage
│   ├── Dashboard.tsx         // User's personal library page
│   ├── Login.tsx             // Login page
│   ├── Register.tsx          // Registration page
├── store/
│   ├── useAuthStore.ts       // Zustand store for authentication state
│   ├── useBooksStore.ts      // Zustand store for managing book state
│   └── useModal.ts           // Custom hook to handle modal state
├── utils/
│   ├── constants.ts          // Application constants (e.g., API endpoints)
│   ├── validation.ts         // Form validation schemas using Yup
│   ├── helpers.ts            // Utility functions (e.g., date formatting)
├── App.tsx                   // Main application component
├── main.tsx                 // Entry point for React application
└── index.css             // Global CSS using TailwindCSS
```

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

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
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Scripts
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Lints the project files.
- **`npm run preview`**: Previews the production build locally.

## Dependencies
Key dependencies include:
- **React**: UI library for building components.
- **Zustand**: Lightweight state management.
- **React Hook Form**: Form management library.
- **Yup**: Schema validation.
- **Axios**: HTTP client for API requests.
- **React Query**: Data-fetching and caching.
- **TailwindCSS**: Utility-first CSS framework.

## DevDependencies
Key development dependencies include:
- **TypeScript**: Static typing.
- **Vite**: Build tool for fast development.
- **ESLint**: Linting.
- **TailwindCSS**: Utility-first CSS framework.

## Configuration
### API Base URL
The API base URL is configured in `src/api/axiosInstance.ts`. Update the base URL to match your backend server.

### TailwindCSS
TailwindCSS is configured in `src/tailwind.config.js`.

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
