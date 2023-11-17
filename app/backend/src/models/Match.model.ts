import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { HomeTeamIncluded, IMatchHomeTeam, matchUpdateData } from '../Types/Matches.type';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
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

  async findByQuery(query: boolean): Promise<IMatch[]> {
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

  async listHomeTeamSummarize(): Promise<IMatchHomeTeam[]> {
    const dbData = (await this.model.findAll({
      include: {
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      where: { inProgress: false },
    })) as (SequelizeMatch & HomeTeamIncluded)[];

    return dbData as IMatchHomeTeam[];
  }

  async finishUpdate(id: number): Promise<number> {
    const [dbData] = await this.model.update({ inProgress: false }, { where: { id } });

    return dbData;
  }

  async matchesGoalUpdate(id: number, data: matchUpdateData): Promise<number> {
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

  async create(data: Partial<IMatch>): Promise<IMatch> {
    const {
      awayTeamGoals,
      homeTeamGoals,
      awayTeamId,
      homeTeamId,
    } = data;
    const dbData = await this.model.create({
      awayTeamGoals: awayTeamGoals as number,
      homeTeamGoals: homeTeamGoals as number,
      awayTeamId: awayTeamId as number,
      homeTeamId: homeTeamId as number,
      inProgress: true,
    });

    return dbData;
  }
}
