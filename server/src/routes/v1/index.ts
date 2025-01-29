import { Router } from 'express';
import authRoutes from './auth';
import bookRoutes from './book';

const router = Router();

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     tags:
 *       - Default
 * 
 *     summary: Check API health
 *     description: Returns a message indicating the API is healthy
 * 
 *     security: []
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
 *                   example: API is healthy!
 *       204:
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No content available
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resources not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is healthy!' });
});

router.use('/', authRoutes);
router.use('/', bookRoutes);

export default router;
