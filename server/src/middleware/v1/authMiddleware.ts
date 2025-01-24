import { RequestHandler } from 'express';
import { JWT_SECRET } from '../../config/config';
import { User } from '../../models/userModel';
import jwt from "jsonwebtoken";
import { ICustomRequest } from '../../types/requestTypes';


interface JwtPayload {
  id: string;
}

export const authenticateToken: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    (req as ICustomRequest).user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: 'Token expired' });
    } else {
      res.status(403).json({ message: 'Invalid token' });
    }
  }
};
