import { Request, Response } from 'express';
import UserService from '../services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { status, data } = await this.userService.login(email, password);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  static async getRole(req: Request, res: Response) {
    const bearerToken = req.headers.authorization;

    const { status, data } = UserService.getRoleByToken(bearerToken as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
