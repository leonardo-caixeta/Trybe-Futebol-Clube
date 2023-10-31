import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(ID: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(ID);
    if (!dbData) return null;

    const { id, teamName } = dbData;

    return { id, teamName };
  }
}
