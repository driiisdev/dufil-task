import { Request, Response } from 'express';
import { ICustomRequest } from '../../types/requestTypes';
import { AuthService } from '../../services/v1/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unexpected error occurred.' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.json({ user, accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unexpected error occurred.' });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(200).json({message:"Token refreshed successfully", result});
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({message:"Token refresh failed"});      
    } else {
      res.status(401).json({message:"An unexpected error occurred."});      
    }
  }
};

export const logout = async (req: ICustomRequest, res: Response) => {
  try {
    await authService.logout(req.user?.id as string);
    res.json({ message: 'Logged out successful' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};
