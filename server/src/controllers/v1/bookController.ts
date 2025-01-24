import { NextFunction, Request, Response } from 'express';
import { ICustomRequest } from '../../types/requestTypes';
import { BookService } from '../../services/v1/bookService';

const bookService = new BookService();

export const getAllPublicBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };
    const response = await bookService.getPublicBooks(pagination);
    res.status(200).json({
      message: "Books fetch successful",
      data: response
    });
  } catch (error) {
    next(error)
  }
};

export const searchPublicBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };
    const search = req.query.title as string;
    const books = await bookService.searchPublicBooks(pagination, search);
    res.status(200).json({ 
      message: "book searched", 
      data: books
    });
  } catch (error) {
    next(error)
  }
};

export const getUserBooks = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };
    const search = req.query.title as string;
    const books = await bookService.getUserBooks(userId, pagination, search);
    res.status(200).json({
      message: "Books found", 
      data: books
    });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const book = await bookService.getBook(id, userId);
    res.status(200).json({
      message: "Book found",
      data: book
    });
  } catch (error) {
    next(error)
  }
};

export const createBook = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const book = await bookService.createBook(userId as string, req.body);
    res.status(201).json({
      message: "Book created successfully",
      data: book
    });
  } catch (error) {
    next(error)
  }
};

export const updateBook = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const book = await bookService.updateBook(id, userId, req.body);
    res.status(201).json({
      message: "Book updated successfully",
      data: book
    });
  } catch (error) {
    next(error)
  }
};

export const deleteBook = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    await bookService.deleteBook(id, userId as string);
    res.status(204).send({
      message: "book deleted successfully"
    });
  } catch (error) {
    next(error)
  }
};
