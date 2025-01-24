import express, {  Request, Response, NextFunction, Application } from 'express';
import {} from 'express';
import { HttpError } from 'http-errors';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { syncDatabase } from './config/db';
import { errorHandler } from './middleware/v1/errorMiddleware';
import v1Routes from './routes/v1';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const baseUrl = process.env.BASE_URL || "http://localhost:8080";
const FrontendOrigin = process.env.FrontendOrigin || "https://dufil-task.vercel.app";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'library API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: `${baseUrl}`,
      },
    ],
  },
  apis: [path.resolve(__dirname, './routes/v1/**/*.ts')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", v1Routes);
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

syncDatabase()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Database synchronization failed:', error);
  });

export default app;
