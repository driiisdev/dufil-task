import { NextFunction, Router } from 'express';
import { register, login, logout, refreshToken } from '../../../controllers/v1/authController';
import { authenticateToken } from '../../../middleware/v1/authMiddleware';
import { registerValidator, loginValidator } from '../../../utils/validators/authValidator';
import { validate } from '../../../middleware/v1/validationMiddleware';

const router = Router();

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Authentication
 * 
 *     summary: Register a new user
 *     description: Allows a new user to create an account by providing the required information.
 * 
 *     security: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
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
 *                   example: "Register Successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "533ac2d1-3444-4fa1-a0c8-78d54b8a310d"
 *                         username:
 *                           type: string
 *                           example: "newuser"
 *                         email:
 *                           type: string
 *                           example: "newuser@example.com"
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
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Conflict detected"
 *       500: 
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/register', registerValidator, validate as NextFunction, register);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with their email and password.
 * 
 *     tags:
 *       - Authentication
 * 
 *     security: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
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
 *                   example: "Login Successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "a4ec58cc-d40f-43b5-a80e-a682103d8b88"
 *                         username:
 *                           type: string
 *                           example: "newuser"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "user@example.com"
 *                     accessToken:
 *                       type: string
 *                       description: JWT access token for authentication
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0ZWM1OGNjLWQ0MGYtNDNiNS1hODBlLWE2ODIx"
 *                     refreshToken:
 *                       type: string
 *                       description: JWT refresh token to obtain a new access token
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0ZWM1OGNjLWQ0MGYtNDNiNS1hODBlLWE2ODIxMDNkOGI4O"
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
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/login', loginValidator, validate as NextFunction, login);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 * 
 *     summary: Refresh the user's authentication token
 *     description: Provides a new access token when the user's current token is expired or close to expiring.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token provided to the user
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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
 *                   example: "Token refreshed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: The new access token
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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
 *       500: 
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/refresh-token', refreshToken);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/logout:
 *   post:
 *     tags:
 *       - Authentication
 * 
 *     summary: Logout the user
 *     description: Logs out the authenticated user and invalidates their session or token.
 * 
 *     security:
 *       - BearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "a4a376f0-667f-4807-99cb-95ddd80860ac"
 * 
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized access
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/logout', authenticateToken, logout);

export default router;
