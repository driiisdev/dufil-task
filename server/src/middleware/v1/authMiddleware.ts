import { RequestHandler } from 'express';
import { JWT_SECRET } from '../../config/config';
import { User } from '../../models/userModel';
import jwt from "jsonwebtoken";
import { ICustomRequest } from '../../types/requestTypes';


interface JwtPayload {
  id: string;
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  (async () => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      (req as ICustomRequest).user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  })();
};
