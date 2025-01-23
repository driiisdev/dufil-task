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
 *  components:
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
 *           type: integer
 *           example: 4
 *         comments:
 *           type: string
 *           example: "Great book!"
 *     IBookResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "556k"
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
 *           type: integer
 *           example: 4
 *         comments:
 *           type: string
 *           example: "Great book!"
 * 
 *     PublicBooksResponse:
 *       type: object
 *       properties:
 *         books:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IBookResponse'
 *         total:
 *           type: integer
 *           example: 100
 *         totalPages:
 *           type: integer
 *           example: 10
 *         currentPage:
 *           type: integer
 *           example: 1
 * 
 * /api/v1/books/public:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all public books with pagination
 *     description: Retrieves a list of public books with pagination. Allows users to see a list of books that are publicly available.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items to return per page.
 *     responses:
 *       200:
 *         description: A list of public books with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicBooksResponse'
 *       404:
 *         description: Books not found
 *       500:
 *         description: Internal server error
 */
router.get('/books/public', getAllPublicBooks);

/**
 * @swagger
 * /api/v1/books/public/search:
 *   get:
 *     summary: Search public books by title and author
 *     description: Allows users to search for public books based on title and author.
 *     tags:
 *       - Books
 *     security: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: "Test Book"
 *         description: The title of the book to search for.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of items to return per page.
 *     responses:
 *       200:
 *         description: A list of books matching the search criteria with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicBooksResponse'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/books/public/search', searchPublicBooks);

/**
 * @swagger 
 * /api/v1/books/public/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a specific book
 *     description: Retrieves the details of a specific book by its ID.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: The details of the specific book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBookResponse'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
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
 *     summary: Get all books for the user
 *     description: Retrieves a list of books that belong to the user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicBooksResponse'
 *       401:
 *         description: Unauthorized (if the user is not authenticated)
 *       500:
 *         description: Internal server error
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
 *     summary: Get a specific book for the user
 *     description: Retrieves the details of a specific book owned by the user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "N6yyy32"
 *     responses:
 *       200:
 *         description: The details of the specific book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBookResponse'
 *       401:
 *         description: Unauthorized (if the user is not authenticated)
 *       403:
 *         description: Forbidden (if the book does not belong to the user)
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
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
 *     summary: Create a new book
 *     description: Allows a user to create a new book. Only  users can create books.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBookCreate'
 *     responses:
 *       201:
 *         description: Book successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IBookResponse'
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (if the user is not authenticated)
 *       500:
 *         description: Internal server error
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
 *     summary: Update a  book
 *     description: Allows a user to update a book. Only users can update books.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBookCreate'
 *     responses:
 *       201:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/IBookResponse'
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized (if the user is not authenticated)
 *       403:
 *         description: Forbidden (if the book does not belong to the user)
 *       500:
 *         description: Internal server error
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
 *     summary: Delete a specific book for the user
 *     description: Deletes a book owned by the user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete.
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       401:
 *         description: Unauthorized (if the user is not authenticated)
 *       403:
 *         description: Forbidden (if the book does not belong to the user)
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/books/:id', authenticateToken, deleteBook);

export default router;
