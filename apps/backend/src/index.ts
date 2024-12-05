import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { config } from './config/env';
import projectRoutes from './routes/project';
import backlogRoutes from './routes/backlog';
import filesRoutes from './routes/files';
import { dbService } from './services/DatabaseService';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Log environment variables (excluding sensitive data)
console.log('Environment variables loaded:', {
    PORT: config.PORT,
    OPENAI_API_KEY: '***',
    BASE_PROJECTS_PATH: config.BASE_PROJECTS_PATH,
    CORS_ORIGIN: config.CORS_ORIGIN
});

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NeuroForge API',
            version: '1.0.0',
            description: 'API documentation for NeuroForge',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors({
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/backlog', backlogRoutes);
app.use('/api/files', filesRoutes);

// Not found handler
app.use((req: express.Request, res: express.Response) => {
    console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
interface ApiError extends Error {
    status?: number;
}

app.use((err: ApiError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    const status = err.status || 500;
    res.status(status).json({ 
        error: err.message || 'Something broke!',
        status
    });
});

// Initialize database and start server
const startServer = async () => {
    try {
        await dbService.initialize();
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
            console.log(`API Documentation available at http://localhost:${config.PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
