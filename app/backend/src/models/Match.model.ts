import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { matchUpdateData } from '../Interfaces/CRUD/ICRUDModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll();

    return dbData;
  }

  async findByQuery(query: string): Promise<IMatches[]> {
    const dbData = await this.model.findAll({ where: { inProgress: query } });

    return dbData;
  }

  async finishUpdate(id: number): Promise<number> {
    const [dbData] = await this.model.update({ inProgress: false }, { where: { id } });

    return dbData;
  }

  async matchesUpdate(id: number, data: matchUpdateData): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = data;
    const [dbData] = await this.model.update(
      { homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );

    return dbData;
  }
}
