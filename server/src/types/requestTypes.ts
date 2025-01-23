import { Request } from 'express';
import { User } from '../models/userModel';

export interface ICustomRequest extends Request {
  user?: User | null;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
