import express, { Router } from 'express';
import managementRouter from './management';
import stateRouter from './state';
import chatRouter from './chat';
import gitRouter from './git';

const router: Router = express.Router();

// Mount sub-routers
router.use('/', managementRouter);
router.use('/', stateRouter);
router.use('/', chatRouter);
router.use('/', gitRouter);

export default router;
