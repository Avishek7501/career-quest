import cors from 'cors';
import express, { type Express } from 'express';

import initMiddleware from './middlewares/init';
import routerSetup from './init/routerSetup';
import environments from './config/environments';

const APP_PORT = environments.APP_PORT;

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow cookies to be sent with requests
};
app.use(cors(corsOptions)).use(express.json()).use(express.static('public'));

initMiddleware(app);
routerSetup(app);

app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
});
