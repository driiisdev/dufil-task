import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);

    const validationError = new Error(errorMessages.join(', '));
    validationError.name = 'ValidationError';
    return next(validationError);
  }

  next();
};
