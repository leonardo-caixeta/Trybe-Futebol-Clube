import { IUsers } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });

    return dbData;
  }
}
