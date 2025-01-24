import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
