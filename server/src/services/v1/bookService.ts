import { Op } from 'sequelize';
import models from '../../models';
import { IPaginationParams, ISearchParams } from '../../types/requestTypes';
import { GetPublicBooksResponse,SearchPublicBooksResponse, GetUserBooksResponse, GetBookResponse, CreateBookResponse, UpdateBookResponse, DeleteBookResponse } from '../../types/responseTypes';
import { IBook } from '../../types/bookTypes';

const { Book } = models;


export class BookService {
  async getPublicBooks(pagination: IPaginationParams): Promise<GetPublicBooksResponse> {
    const { page = 1, limit = 10, sortBy, sortOrder } = pagination;

    const offset = (page - 1) * limit;
    const books = await Book.findAndCountAll({
      where: { isPublic: true },
      order: [[sortBy || 'createdAt', sortOrder || 'desc']],
      limit,
      offset,
    });

    const Books = books.rows.map((book) => book.toJSON() as IBook);

    return {
      books: Books,
      total: books.count,
      totalPages: Math.ceil(books.count / limit),
      currentPage: page,
    };
  }

  async searchPublicBooks(pagination: IPaginationParams, search: ISearchParams): Promise<SearchPublicBooksResponse> {
    const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
    const { title, author } = search;

    const offset = (page - 1) * limit;
    
    const searchConditions = [];
    if (title) {
      searchConditions.push({ title: { [Op.iLike]: `%${title}%` } });
    }
    if (author) {
      searchConditions.push({ author: { [Op.iLike]: `%${author}%` } });
    }

    const whereClause: any = {
      isPublic: true,
    };

    if (searchConditions.length > 0) {
      whereClause[Op.or] = searchConditions;
    }

    const books = await Book.findAndCountAll({
      where: whereClause,
      order: [[sortBy || 'createdAt', sortOrder || 'desc']],
      limit,
      offset,
    });

    const Books = books.rows.map((book) => book.toJSON() as IBook);

    return {
      books: Books,
      total: books.count,
      totalPages: Math.ceil(books.count / limit),
      currentPage: page,
    };
  }

  async getUserBooks(userId: string, pagination: IPaginationParams, search: ISearchParams): Promise<GetUserBooksResponse> {
    const { page = 1, limit = 10, sortBy, sortOrder } = pagination;
    const { title, author } = search;

    const offset = (page - 1) * limit;

    const searchConditions = [];
    if (title) {
      searchConditions.push({ title: { [Op.iLike]: `%${title}%` } });
    }
    if (author) {
      searchConditions.push({ author: { [Op.iLike]: `%${author}%` } });
    }

    const books = await Book.findAndCountAll({
      where: {
        userId,
        ...(searchConditions.length > 0 && { [Op.or]: searchConditions }),
      },
      order: [[sortBy || 'createdAt', sortOrder || 'desc']],
      limit,
      offset,
    });

    const Books = books.rows.map((book) => book.toJSON() as IBook);

    return ({
      books: Books,
      total: books.count,
      totalPages: Math.ceil(books.count / limit),
      currentPage: page,
    });
  }  

  async getBook(bookId: string, userId?: string): Promise<GetBookResponse> {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (!book.isPublic && book.userId !== userId) {
      throw new Error('You do not have permission to view this book');
    }

    return ({book: book.toJSON() as IBook});
  }

  async createBook(userId: string, bookData: Partial<IBook>): Promise<CreateBookResponse>  {
    const newBook = await Book.create({ ...bookData, userId });
    return ({book: newBook.toJSON() as IBook});
  }

  async updateBook(bookId: string, userId: string, bookData: Partial<IBook>): Promise<UpdateBookResponse> {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.userId !== userId) {
      throw new Error('You do not have permission to update this book');
    }

    await book.update(bookData);
    return ({book: book.toJSON() as IBook});
  }

  async deleteBook(bookId: string, userId: string): Promise<DeleteBookResponse> {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.userId !== userId) {
      throw new Error('You do not have permission to delete this book');
    }

    await book.destroy();

    return({message: 'Book Deleted'})
  }
}
