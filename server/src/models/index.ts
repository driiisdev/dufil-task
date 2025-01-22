import { sequelize } from '../config/db';
import { User } from './userModel';
import { Token } from './tokenModel';
import { Book } from './bookModel';

User.hasMany(Book, { foreignKey: 'userId', as: 'books' });
User.hasMany(Token, { foreignKey: 'userId', as: 'tokens'});
Book.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Token.belongsTo(User, {foreignKey: 'userId'})

const models = {
  User,
  Token,
  Book,
  sequelize,
};

export default models;
