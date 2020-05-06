import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadCofing from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadCofing.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server started on port in 3333!');
});
