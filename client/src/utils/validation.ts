import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .max(255, 'Email must be less than 255 characters'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .optional(),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .max(255, 'Email must be less than 255 characters'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

export const bookSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(255, 'Title must be less than 255 characters'),
  author: yup
    .string()
    .required('Author is required')
    .max(255, 'Author must be less than 255 characters'),
  isPublic: yup.boolean().optional(),
  readingStatus: yup
    .string()
    .oneOf(['read', 'reading', 'want-to-read'])
    .optional(),
  rating: yup
    .string()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .optional(),
  notes: yup
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
});
