import * as dotenv from 'dotenv';
// Load environment variables before importing other modules
dotenv.config();

import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project';
import backlogRoutes from './routes/backlog';
import filesRoutes from './routes/files';

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/backlog', backlogRoutes);
app.use('/api/files', filesRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: {
      PORT: process.env.PORT,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '***' : undefined,
      BASE_PROJECTS_PATH: process.env.BASE_PROJECTS_PATH,
      CORS_ORIGIN: process.env.CORS_ORIGIN
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
  console.log('Environment variables loaded:', {
    PORT: process.env.PORT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '***' : undefined,
    BASE_PROJECTS_PATH: process.env.BASE_PROJECTS_PATH,
    CORS_ORIGIN: process.env.CORS_ORIGIN
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default app;
