import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class Validations {
  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = JWT.verify(token);
    if (typeof payload === 'string') {
      return res.status(401).json({ message: payload });
    }
    req.user = payload;

    next();
  }
}
