import { Router, NextFunction } from 'express';
import {
  getAllPublicBooks,
  searchPublicBooks,
  getUserBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../../../controllers/v1/bookController';
import { authenticateToken } from '../../../middleware/v1/authMiddleware';
import { bookValidator } from '../../../utils/validators/bookValidator';
import { validate } from '../../../middleware/v1/validationMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     IBookCreate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "New Book"
 *         author:
 *           type: string
 *           example: "Author Name"
 *         isPublic:
 *           type: string
 *           example: "New Book"
 *         readingStatus:
 *           type: string
 *           enum: ['read', 'reading', 'want-to-read']
 *           example: "reading"
 *         rating:
 *           type: string
 *           example: "4"
 *         comments:
 *           type: string
 *           example: "Great book!"
 * 
 *     IBookResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a4a376f0-667f-4807-99cb-95ddd80860ac"
 *         title:
 *           type: string
 *           example: "New Book"
 *         author:
 *           type: string
 *           example: "Author Name"
 *         isPublic:
 *           type: string
 *           example: "New Book"
 *         readingStatus:
 *           type: string
 *           enum: ['read', 'reading', 'want-to-read']
 *           example: "reading"
 *         rating:
 *           type: string
 *           example: "4"
 *         comments:
 *           type: string
 *           example: "Great book!"
 * 
 *     BooksResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Books retrieved successfully"
 *         data:
 *           type: object
 *           properties:
 *             books:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IBookResponse'
 *             total:
 *               type: string
 *               example: "100"
 *             totalPages:
 *               type: string
 *               example: "10"
 *             currentPage:
 *               type: string
 *               example: "1"
 * 
 * /api/v1/books/public:
 *   get:
 *     tags:
 *       - Books
 * 
 *     summary: Get all public books with pagination
 *     description: Retrieves a list of public books with pagination. Allows users to see a list of books that are publicly available.
 * 
 *     security: []
 * 
 *     parameters:
 *       - in: query
 *         name: page
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         description: The number of items to return per page.
 *         schema:
 *           type: integer
 *           example: 10
 * 
 *     responses:
 *       200:
 *         description:	OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BooksResponse'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "books not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/books/public', getAllPublicBooks);

/**
 * @swagger
 * /api/v1/books/public/search:
 *   get:
 *     tags:
 *       - Books
 * 
 *     summary: Search public books by title
 *     description: Allows users to search for public books based on title.
 * 
 *     security: []
 * 
 *     parameters:
 *       - in: query
 *         name: title
 *         description: The title of the book to search for.
 *         schema:
 *           type: string
 *           example: "Test Book"
 *       - in: query
 *         name: page
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         description: The number of items to return per page.
 *         schema:
 *           type: integer
 *           example: 10
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BooksResponse'
 *       204:
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No content available"
 *                 data:
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items: {}
 *                       example: []
 *                     total:
 *                       type: string
 *                       example: "0"
 *                     totalPages:
 *                       type: string
 *                       example: "0"
 *                     currentPage:
 *                       type: string
 *                       example: "1"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/books/public/search', searchPublicBooks);

/**
 * @swagger 
 * /api/v1/books/public/{id}:
 *   get:
 *     tags:
 *       - Books
 * 
 *     summary: Get a specific book
 *     description: Retrieves the details of a specific book by its ID.
 * 
 *     security: []
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "74785314-b3a5-41fc"
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "74785314-b3a5-41fc"
 *                         title:
 *                           type: string
 *                           example: "New Book"
 *                         author:
 *                           type: string
 *                           example: "Author Name"
 *                         readingStatus:
 *                           type: string
 *                           enum: ['read', 'reading', 'want-to-read']
 *                           example: "reading"
 *                         rating:
 *                           type: string
 *                           example: "4"
 *                         comment:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/books/public/:id', getBook);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/books:
 *   get:
 *     tags:
 *       - Books
 * 
 *     summary: Get all books for the user
 *     description: Retrieves a list of books that belong to the user.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BooksResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/books', authenticateToken, getUserBooks);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/v1/books/{id}:
 *   get:
 *     tags:
 *       - Books
 * 
 *     summary: Get a specific book for the user
 *     description: Retrieves the details of a specific book owned by the user.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "74785314-b3a5-41fc"
 * 
 *     responses:
 *       200:
 *         description: The details of the specific book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "74785314-b3a5-41fc"
 *                         title:
 *                           type: string
 *                           example: "New Book"
 *                         author:
 *                           type: string
 *                           example: "Author Name"
 *                         readingStatus:
 *                           type: string
 *                           enum: ['read', 'reading', 'want-to-read']
 *                           example: "reading"
 *                         rating:
 *                           type: string
 *                           example: "4"
 *                         comment:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "unauthorized access"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/books/:id', authenticateToken, getBook);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/books:
 *   post:
 *     tags:
 *       - Books
 * 
 *     summary: Create a new book
 *     description: Allows a user to create a new book. Only users can create books.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBookCreate'
 * 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "74785314-b3a5-41fc-84d2-e42048eaac62"
 *                         title:
 *                           type: string
 *                           example: "New Book"
 *                         author:
 *                           type: string
 *                           example: "Author Name"
 *                         readingStatus:
 *                           type: string
 *                           enum: ['read', 'reading', 'want-to-read']
 *                           example: "reading"
 *                         rating:
 *                           type: string
 *                           example: "4"
 *                         comment:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request format"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/books', authenticateToken, bookValidator, validate as NextFunction, createBook);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/books/{id}:
 *   patch:
 *     tags:
 *       - Books
 * 
 *     summary: Update a  book
 *     description: Allows a user to update a book. Only users can update books.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBookCreate'
 * 
 *     responses:
 *       201:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book Updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "74785314-b3a5-41fc"
 *                         title:
 *                           type: string
 *                           example: "New Book"
 *                         author:
 *                           type: string
 *                           example: "Author Name"
 *                         readingStatus:
 *                           type: string
 *                           enum: ['read', 'reading', 'want-to-read']
 *                           example: "reading"
 *                         rating:
 *                           type: string
 *                           example: "4"
 *                         comment:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request format"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.patch('/books/:id', authenticateToken, bookValidator, validate as NextFunction, updateBook);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 * 
 *     summary: Delete a specific book for the user
 *     description: Deletes a book owned by the user.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the book to delete.
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.delete('/books/:id', authenticateToken, deleteBook);

export default router;
