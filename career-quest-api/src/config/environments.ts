import dotenv from 'dotenv';

dotenv.config();

const environments = {
    APP_PORT: process.env.APP_PORT ?? 8000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
};

export default environments;
