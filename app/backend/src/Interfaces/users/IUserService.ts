import { ServiceResponse } from '../ServiceResponse';

export interface IUserServiceLogin {
  login(email: string, password: string):
  Promise<ServiceResponse<{ token: string } | string> | null>;
}

export type IUserService = IUserServiceLogin;
