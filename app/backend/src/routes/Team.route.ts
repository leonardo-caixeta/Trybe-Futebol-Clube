import { Request, Router, Response } from 'express';
import TeamController from '../controllers/Team.controller';

const bookController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => bookController.findAll(req, res));

router.get('/:id', (req: Request, res: Response) => bookController.findById(req, res));

export default router;
