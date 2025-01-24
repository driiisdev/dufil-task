import dotenv from 'dotenv';

dotenv.config();

type Environment = 'development' | 'test' | 'production';

interface Config {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    dialectOptions?: object;
  };
}

const config: Config = {
  development: {
    username: process.env.DEV_DB_USERNAME!,
    password: process.env.DEV_DB_PASSWORD!,
    database: process.env.DEV_DB_NAME!,
    host: process.env.DEV_DB_HOST!,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME!,
    password: process.env.TEST_DB_PASSWORD!,
    database: process.env.TEST_DB_NAME!,
    host: process.env.TEST_DB_HOST!,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME!,
    password: process.env.PROD_DB_PASSWORD!,
    database: process.env.PROD_DB_NAME!,
    host: process.env.PROD_DB_HOST!,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';
const dbConfig = config[environment];

export const JWT_SECRET = process.env.JWT_SECRET as string;
export default dbConfig;
