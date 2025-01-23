import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import moment from 'moment';
import { Op } from 'sequelize';
import { JWT_SECRET } from '../../config/config';
import { UserDTO, RegisterResponseDTO, LoginResponseDTO, RefreshTokenResponseDTO, LogoutResponseDTO } from '../../dtos/userDTO';
import { IUserCredentials } from '../../types/userTypes';
import models from '../../models';

const { User, Token } = models;

export class AuthService {
  
  async register(credentials: IUserCredentials): Promise<RegisterResponseDTO> {
    const { username, email, password } = credentials;
  
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
  
      if (existingUser) {
        throw createHttpError(409, 'User with this email or username already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      const sanitizedUser: RegisterResponseDTO = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
  
      return sanitizedUser;
    } catch (error) {
      if (error instanceof createHttpError.HttpError) {
        throw error;
      }
      throw createHttpError(500, 'An error occurred while registering the user');
    }
  }

  async login(credentials: IUserCredentials): Promise<LoginResponseDTO > {
    const { email, password } = credentials;
    const user = await User.findOne({ where: {email}});

    if (!user) {
      throw createHttpError(404, 'No user found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, "Invalid password");
    }

    if (!JWT_SECRET) {
      throw createHttpError(500, 'JWT secret is not defined');
    }

    try {
      const createToken = (type: 'access' | 'refresh', expiresIn: string) => {
        const payload = { id: user.id };
        const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn });
        return Token.create({
          userId: user.id,
          token,
          type,
          expires: moment().add(expiresIn, 'seconds').toDate(),
        });
      };
  
      const [accessToken, refreshToken] = await Promise.all([
        createToken('access', '1h'),
        createToken('refresh', '24h'),
      ]);
  
      const sanitizedUser: UserDTO = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
  
      return { user: sanitizedUser, accessToken: accessToken.token, refreshToken: refreshToken.token };
    } catch (error) {
      throw createHttpError(500, 'Error generating tokens');
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    try {
      if (!JWT_SECRET) {
        throw createHttpError(500, 'JWT secret is not defined');
      }
  
      const decoded = jwt.verify(refreshToken, JWT_SECRET as string) as JwtPayload;
  
      const tokenDoc = await Token.findOne({
        where: {
          token: refreshToken,
          type: 'refresh',
          blacklisted: false,
        },
      });
  
      if (!tokenDoc) {
        throw createHttpError(401, 'Refresh token not found or has been blacklisted');
      }
  
      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw createHttpError(404, 'User not found');
      }
  
      const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
      await Token.create({
        userId: user.id,
        token: newAccessToken,
        type: 'access',
        expires: moment().add(1, 'hour').toDate(),
      });
  
      return { accessToken: newAccessToken };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw createHttpError(401, 'Invalid refresh token');
      }
      if (error instanceof createHttpError.HttpError) {
        throw error;
      }
      throw createHttpError(500, 'An error occurred while refreshing the token');
    }
  }

  async logout(userId: string): Promise<LogoutResponseDTO> {
    try {
      const unexpiredTokens = await Token.findAll({
        where: {
          userId,
          expires: {
            [Op.gt]: new Date()
          },
          blacklisted: false
        }
      });
  
      if (unexpiredTokens.length === 0) {
        throw createHttpError(404, 'No active tokens found');
      }
  
      const blacklistTokenPromises = unexpiredTokens.map((token) =>
        Token.update({ blacklisted: true }, {
          where: { id: token.id }
        })
      );
  
      await Promise.all(blacklistTokenPromises);
  
      return { message: 'Logged out successfully' };
    } catch (error) {
      if (error instanceof createHttpError.HttpError) {
        throw error;
      }
      throw createHttpError(500, 'An error occurred during logout');
    }
  }
  
}
