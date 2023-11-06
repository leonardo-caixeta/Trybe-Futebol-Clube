import { IUsers } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(email: string, password: string): Promise<IUsers | null> {
    const dbData = this.model.findOne({ where: { email, password } });

    return dbData;
  }
}
