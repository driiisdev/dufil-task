export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh-token',
  },
  BOOKS: {
    PUBLIC: '/books/public',
    PUBLIC_SEARCH: '/books/public/search',
    USER: '/books',
  },
};

export const QUERY_KEYS = {
  PUBLIC_BOOKS: 'public-books',
  USER_BOOKS: 'user-books',
};
