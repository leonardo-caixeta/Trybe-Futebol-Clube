import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(ID: number): Promise<ITeam | null> {
    const dbData = await this.model.findOne({ where: { id: ID } });
    if (!dbData) return null;

    const { id, teamName } = dbData;

    return { id, teamName };
  }
}
