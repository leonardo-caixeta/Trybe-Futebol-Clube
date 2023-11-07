import { Request, Router, Response } from 'express';
import UserController from '../controllers/User.controller';
import Validations from '../middlewares/Validation';

const userController = new UserController();

const router = Router();

router.post('/login', (req: Request, res: Response) => userController.login(req, res));
router.get(
  '/login/role',
  Validations.validateToken,
  UserController.getRole,
);

export default router;
