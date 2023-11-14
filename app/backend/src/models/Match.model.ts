import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { matchUpdateData } from '../Interfaces/CRUD/ICRUDModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });

    return dbData;
  }

  async findByQuery(query: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
      where: { inProgress: query },
    });
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
