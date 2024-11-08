import type { Express } from 'express';

import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

const initMiddleware = (app: Express): void => {
    app.use(morgan(':method :url :status :http-version :response-time '));
    setTimeout(() => {
        app.use(
            '/api/docs',
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: '/api/swagger/swagger.json'
                },
                swaggerUrl: '/api/swagger/docs'
            })
        );
    }, 1000); // Adjust the delay as needed
};

export default initMiddleware;
