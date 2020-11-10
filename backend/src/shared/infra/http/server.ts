import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadCofing from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from './routes/middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';
import { errors } from 'celebrate';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

// liberar utilizaçao das imagens
app.use('/files', express.static(uploadCofing.uploadsFolder));
app.use(routes);

app.use(errors());

// tratativa de errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port in 3333!');
});
