declare namespace Express {
  export interface Request {
    user: import('../utils/JWT').UserPayload;
  }
}
