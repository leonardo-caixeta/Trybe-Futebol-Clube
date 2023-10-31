import { Router } from 'express';
import TeamRouter from './Team.route';

const router = Router();

router.use('/teams', TeamRouter);

export default router;
