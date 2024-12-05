import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 3001,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    BASE_PROJECTS_PATH: process.env.BASE_PROJECTS_PATH || '',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
