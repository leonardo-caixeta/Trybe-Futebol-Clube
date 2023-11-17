import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req, res) => leaderboardController.listHomeTeamSummary(req, res));

export default router;
