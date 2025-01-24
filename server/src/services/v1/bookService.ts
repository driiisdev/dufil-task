import { Op } from 'sequelize';
import models from '../../models';
import { IPaginationParams } from '../../types/requestTypes';
import createHttpError from 'http-errors';
import { GetPublicBooksResponse,SearchPublicBooksResponse, GetUserBooksResponse, GetBookResponse, CreateBookResponse, UpdateBookResponse, DeleteBookResponse } from '../../types/responseTypes';
import { IBook } from '../../types/bookTypes';

const { Book } = models;


export class BookService {

  async getPublicBooks(pagination: IPaginationParams): Promise<GetPublicBooksResponse> {
    try {
      const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
      const offset = (page - 1) * limit;
  
      const books = await Book.findAndCountAll({
        where: { isPublic: true },
        order: [[sortBy || 'createdAt', sortOrder || 'desc']],
        limit,
        offset,
      });
  
      const Books = books.rows.map((book) => ({
        id: book.id!,
        title: book.title!,
        author: book.author!,
        readingStatus: book.readingStatus!,
        rating: book.rating!,
        comment: book.comment!,
      }));
  
      return {
        books: Books,
        total: books.count.toString(),
        totalPages: Math.ceil(books.count / limit).toString(),
        currentPage: page.toString(),
      };
    } catch (error) {
      throw createHttpError(500, 'Error retrieving public books');
    }
  }
  
  async searchPublicBooks(
    pagination: IPaginationParams,
    title: string
  ): Promise<SearchPublicBooksResponse> {
    try {
      const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
      const offset = (page - 1) * limit;
    
      const whereClause = title 
        ? { 
            isPublic: true, 
            title: { [Op.iLike]: `%${title}%` } 
          }
        : { 
            isPublic: true 
          };
  
      const books = await Book.findAndCountAll({
        where: whereClause,
        order: [[sortBy || 'createdAt', sortOrder || 'desc']],
        limit,
        offset,
      });
    
      const Books = books.rows.map((book) => ({
        id: book.id!,
        title: book.title!,
        author: book.author!,
        readingStatus: book.readingStatus!,
        rating: book.rating!,
        comment: book.comment!,
      }));
    
      return {
        books: Books,
        total: books.count.toString(),
        totalPages: Math.ceil(books.count / limit).toString(),
        currentPage: page.toString(),
      };
    } catch (error) {
      throw createHttpError(500, 'Error searching public books');
    }
  }

  async getUserBooks(userId: string, pagination: IPaginationParams, search: string): Promise<GetUserBooksResponse> {
    try {
      const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
      const offset = (page - 1) * limit;
  
      const books = await Book.findAndCountAll({
        where: {
          userId,
          ...(search ? { title: { [Op.iLike]: `%${search}%` } } : {}),
        },
        order: [[sortBy || 'createdAt', sortOrder || 'desc']],
        limit,
        offset,
      });
  
      const Books = books.rows.map((book) => ({
        id: book.id!,
        title: book.title!,
        author: book.author!,
        readingStatus: book.readingStatus!,
        rating: book.rating!,
        comment: book.comment!,
      }));
  
      return {
        books: Books,
        total: books.count.toString(),
        totalPages: Math.ceil(books.count / limit).toString(),
        currentPage: page.toString(),
      };
    } catch (error) {
      throw createHttpError(500, 'Error retrieving user books');
    }
  } 

  async getBook(bookId: string, userId?: string): Promise<GetBookResponse> {
    const book = await Book.findByPk(bookId);
  
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
  
    if (!book.isPublic && book.userId !== userId) {
      throw createHttpError(403, 'You do not have permission to view this book');
    }
  
    return {
      book: {
        id: book.id!,
        title: book.title!,
        author: book.author!,
        readingStatus: book.readingStatus!,
        rating: book.rating!,
        comment: book.comment!,
      }
    };
  }

  async createBook(userId: string, bookData: Partial<IBook>): Promise<CreateBookResponse> {
    try {
      const newBook = await Book.create({ 
        ...bookData, 
        userId,
        isPublic: bookData.isPublic || false 
      });
      return {book: newBook.toJSON() as IBook };
    } catch (error) {
      throw createHttpError(400, 'Error creating book');
    }
  }

  async updateBook(bookId: string, userId: string, bookData: Partial<IBook>): Promise<UpdateBookResponse> {
    const book = await Book.findByPk(bookId);
  
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
  
    if (book.userId !== userId) {
      throw createHttpError(403, 'You do not have permission to update this book');
    }
  
    try {
      await book.update(bookData);
      return { book: book.toJSON() as IBook };
    } catch (error) {
      throw createHttpError(500, 'Error updating book');
    }
  }

  async deleteBook(bookId: string, userId: string): Promise<DeleteBookResponse> {
    const book = await Book.findByPk(bookId);
  
    if (!book) {
      throw createHttpError(404, 'Book not found');
    }
  
    if (book.userId !== userId) {
      throw createHttpError(403, 'You do not have permission to delete this book');
    }
  
    try {
      await book.destroy();
      return { message: 'Book Deleted' };
    } catch (error) {
      throw createHttpError(500, 'Error deleting book');
    }
  }

}
