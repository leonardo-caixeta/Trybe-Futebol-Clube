import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export type UserPayload = {
  id: number;
  role: string;
  email: string;
};
export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: UserPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): UserPayload | string {
    try {
      return verify(token, this.secret) as UserPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
