import { Sequelize } from 'sequelize';
import  dbConfig from './config';

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as 'postgres',
    logging: false,
    define: {
      underscored: false,
      freezeTableName: true,
    },
    dialectOptions: dbConfig.dialectOptions || {},
  }
);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ alter: false }); 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize, syncDatabase };
