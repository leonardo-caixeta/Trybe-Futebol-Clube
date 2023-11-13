import { ServiceResponse } from '../ServiceResponse';

export type ServiceReturnRole = { role: string };
export interface IUserServiceLogin {
  login(email: string, password: string):
  Promise<ServiceResponse<{ token: string } | string> | null>;
}

export type IUserService = IUserServiceLogin;
