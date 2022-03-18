import * as express from 'express';
import { config } from 'dotenv';
import { DBConnection } from './app/orm/connect';
import { AppRouter } from './app/routes/app-routes';
import { ErrorHandler } from './app/middleware/error-handler';


config();

const app = express();

DBConnection();

app.use('/api', AppRouter);

app.use(ErrorHandler);

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
