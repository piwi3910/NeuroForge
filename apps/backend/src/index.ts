import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import filesRouter from './routes/files';
import env from './config/env';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/files', filesRouter);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Handle file changes
  socket.on('file:change', (data) => {
    socket.broadcast.emit('file:change', data);
  });

  // Handle cursor position updates
  socket.on('cursor:update', (data) => {
    socket.broadcast.emit('cursor:update', data);
  });
});

// Start server
const port = parseInt(env.PORT, 10);
httpServer.listen(port, () => {
  console.log(`Server running on port ${port} in ${env.NODE_ENV} mode`);
  console.log(`Frontend URL: ${env.FRONTEND_URL}`);
});

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
