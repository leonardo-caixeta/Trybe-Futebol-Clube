import { ServiceResponse } from '../../Types/ServiceResponse.type';

export type ServiceReturnRole = { role: string };

export interface IUserService {
  login(email: string, password: string):
  Promise<ServiceResponse<{ token: string } | string> | null>;
}
