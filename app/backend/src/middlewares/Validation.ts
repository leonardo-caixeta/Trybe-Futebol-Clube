import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = bearerToken.split(' ')[1];

    const payload = JWT.verify(token);

    if (typeof payload === 'string') {
      return res.status(401).json({ message: payload });
    }

    next();
  }
}
