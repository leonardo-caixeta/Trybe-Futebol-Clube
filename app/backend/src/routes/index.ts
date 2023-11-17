import { Router } from 'express';
import TeamRouter from './Team.route';
import UserRouter from './User.route';
import MatchRouter from './Match.route';
import LeaderboardRouter from './Leaderboard.route';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/matches', MatchRouter);
router.use('/', UserRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
