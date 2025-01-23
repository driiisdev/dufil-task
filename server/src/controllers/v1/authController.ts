import { NextFunction, Request, Response } from 'express';
import { ICustomRequest } from '../../types/requestTypes';
import { AuthService } from '../../services/v1/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      message: 'Register Successful', 
      data:{user}
    });
  } catch (error) {
    next(error)
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.status(200).json({
      message: 'Login Successful', 
      data:{user, accessToken, refreshToken}
    });
  } catch (error) {
    next(error)
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const response = await authService.refreshToken(refreshToken);
    res.status(200).json({
      message:"Token refreshed successfully",
      data: response});
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    await authService.logout(req.user?.id as string);
    res.status(200).json({ message: 'Logged out successful' });
  } catch (error) {
    next(error)
  }
};
