import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';

import initMiddleware from './middlewares/init';
import routerSetup from './init/routerSetup';

dotenv.config();
console.log('Database URL: ', process.env.DATABASE_URL);

const APP_PORT = process.env.PORT ?? 8000;

const app: Express = express();

app.use(cors()).use(express.json()).use(express.static('public'));

initMiddleware(app);
routerSetup(app);

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
});
