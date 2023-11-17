import { IMatchHomeTeam, matchUpdateData } from '../../Types/Matches.type';
import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(query: boolean): Promise<IMatch[]>;
  listHomeTeamSummarize(): Promise<IMatchHomeTeam[]>;
  finishUpdate(id: number): Promise<number>;
  matchesGoalUpdate(id: number, data: matchUpdateData): Promise<number>;
  create(data: Partial<IMatch>): Promise<IMatch>
}
