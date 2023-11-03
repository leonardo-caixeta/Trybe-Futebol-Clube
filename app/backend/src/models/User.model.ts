import { IUsers } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async create(data: Omit<IUsers, 'id'>): Promise<IUsers> {
    const user = await this.model.create(data);

    const { id, username, role, email, password } = user;
    return { id, username, role, email, password };
  }
}
