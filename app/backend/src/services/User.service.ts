import * as bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { IUserService, ServiceReturnRole } from '../Interfaces/users/IUserService';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserValidation from './validations/User.validation';
import JWT, { UserPayload } from '../utils/JWT';

export default class UserService implements IUserService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  async login(email: string, password: string):
  Promise<ServiceResponse<{ token: string } | string>> {
    const validation = UserValidation.validateLogin({ email, password });
    if (validation) {
      return validation;
    }

    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email, role: user.role, id: user.id });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  static getRoleByToken(bearerToken: string): ServiceResponse<ServiceReturnRole> {
    const token = bearerToken.split(' ')[1];
    const payload = JWT.verify(token) as UserPayload;

    return { status: 'SUCCESSFUL', data: { role: payload.role } };
  }
}
