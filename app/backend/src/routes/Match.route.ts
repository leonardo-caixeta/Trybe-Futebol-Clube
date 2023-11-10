import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.findAll(req, res));

router.patch('/:id/finish', (req, res) => matchController.finishUpdate(req, res));

router.patch('/:id', (req, res) => matchController.matchFinish(req, res));

export default router;