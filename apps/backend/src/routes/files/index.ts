import express, { Router } from 'express';
import directoryRouter from './directory';
import fileRouter from './file';

const router: Router = express.Router();

// Mount sub-routers
router.use('/', directoryRouter);
router.use('/', fileRouter);

export default router;
