import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import moment from 'moment';
import { Op } from 'sequelize';
import { JWT_SECRET } from '../../config/config';
import { UserRegisterResponseDTO, LoginResponseDTO, RefreshTokenResponseDTO, LogoutResponseDTO } from '../../dtos/userDTO';
import { IUserCredentials } from '../../types/userTypes';
import models from '../../models';

const { User, Token } = models;

export class AuthService {
  
  async register(credentials: IUserCredentials): Promise<UserRegisterResponseDTO> {
    const { username, email, password } = credentials;
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });
  
    if (existingUser) {
      throw createHttpError(409, 'User with this email or username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashedPassword});
        
    return {id: user.id, username: user.username, email: user.email};
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

    const createToken = (type: 'access' | 'refresh', expiresIn: string) => {
      const payload = { id: user.id };
      const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn });
      return Token.create({ userId: user.id, token, type, expires: moment().add(expiresIn, 'seconds').toDate() });
    };

    if (!JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }
  
    const [accessToken, refreshToken] = await Promise.all([createToken('access', '1h'), createToken('refresh', '24h')]);
    
    return { user, accessToken: accessToken.token, refreshToken: refreshToken.token };
  }

  async refreshToken (refreshToken: string): Promise<RefreshTokenResponseDTO> {
    const decoded = jwt.verify(refreshToken, JWT_SECRET as string) as JwtPayload;
    const tokenDoc = await Token.findOne({
      where: {
        token: refreshToken,
        type: 'refresh',
        blacklisted: false,
        expires: { [Op.gt]: new Date() }
      }
    });

    if (!tokenDoc) {
      throw createHttpError ( 401,'Refresh token not found or has been blacklisted');
    }
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw createHttpError (404, 'User not found');
    }
    const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '1h' });
    await Token.create({
      userId: user.id,
      token: newAccessToken,
      type: 'access',
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return { accessToken: newAccessToken };
  }

  async logout(userId: string): Promise<LogoutResponseDTO> {
    const unexpiredTokens = await Token.findAll({
      where: {
        userId,
        expires: {
          [Op.gt]: new Date()
        },
        blacklisted: false
      }
    });
  
    const blacklistTokenPromises = unexpiredTokens.map((token) =>
      Token.update({ blacklisted: true }, {
        where: { id: token.id }
      })
    );
  
    await Promise.all(blacklistTokenPromises);
  
    return { message: 'Logged out successfully' };
  }

}
