import { Request, Response } from 'express';
import { ICustomRequest } from '../../types/requestTypes';
import { BookService } from '../../services/v1/bookService';

const bookService = new BookService();

export const getAllPublicBooks = async (req: Request, res: Response) => {
  try {
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };

    const result = await bookService.getPublicBooks(pagination);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const searchPublicBooks = async (req: Request, res: Response) => {
  try {
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };

    const search = {
      title: req.query.title as string,
      author: req.query.author as string,
    };

    const result = await bookService.searchPublicBooks(pagination, search);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const getUserBooks = async (req: ICustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const pagination = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };

    const search = {
      title: req.query.title as string,
      author: req.query.author as string,
    };

    const result = await bookService.getUserBooks(userId, pagination, search);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const getBook = async (req: ICustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const book = await bookService.getBook(id, userId);
    res.json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  }
};

export const createBook = async (req: ICustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const book = await bookService.createBook(userId as string, req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Bad Request' });
    }
  }
};

export const updateBook = async (req: ICustomRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const book = await bookService.updateBook(id, userId, req.body);
    res.json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  }
};

export const deleteBook = async (req: ICustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    await bookService.deleteBook(id, userId as string);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  }
};
