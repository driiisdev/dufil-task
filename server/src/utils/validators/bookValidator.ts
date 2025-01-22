import { body, query } from 'express-validator';

export const bookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 255 })
    .withMessage('Author must be less than 255 characters'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('is_public must be a boolean'),
  
  body('readingStatus')
    .optional()
    .isIn(['read', 'reading', 'want-to-read'])
    .withMessage('Invalid reading status'),
  
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('notes')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters')
];

export const bookSearchValidator = [
  query('title')
    .optional()
    .isString()
    .trim(),
  
  query('author')
    .optional()
    .isString()
    .trim(),
  
  query('sortBy')
    .optional()
    .isIn(['title', 'author', 'dateAdded'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];
