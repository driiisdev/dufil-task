import { Router } from 'express';
import authRoutes from './auth';
import bookRoutes from './book';

const router = Router();

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     security: []
 *     summary: Check API health
 *     description: Returns a message indicating the API is healthy
 *     tags:
 *       - Default
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API is healthy!
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is healthy!' });
});

router.use('/api/v1', authRoutes);
router.use('/api/v1', bookRoutes);

export default router;
