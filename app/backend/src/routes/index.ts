import { Router } from 'express';
import TeamRouter from './Team.route';
import UserRouter from './User.route';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/', UserRouter);

export default router;
