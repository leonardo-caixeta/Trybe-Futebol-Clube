import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import Validations from '../middlewares/Validation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req, res) => matchController.findAll(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req, res) => matchController.finishUpdate(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req, res) => matchController.matchGoalUpdate(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req, res) => matchController.matchCreate(req, res),
);

export default router;
