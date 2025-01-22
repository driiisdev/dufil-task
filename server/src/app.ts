import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { syncDatabase } from './config/db';
import routes from './routes/v1';

const app: Application = express();

const baseUrl = process.env.BASE_URL || 'http://localhost:8080';

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
        url: baseUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
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
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);

syncDatabase()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Database synchronization failed:', error);
  });

export default app;
