import { matchUpdateData } from '../../Types/Matches.type';
import { ServiceMessage, ServiceResponse } from '../../Types/ServiceResponse.type';
import { ILeaderBoard } from './ILeaderBoards';
import { IMatch } from './IMatch';

export interface IMatchService {
  findById?(id: number): Promise<ServiceResponse<IMatch | ServiceMessage>>;
  findByQuery(query: string): Promise<ServiceResponse<IMatch[]>>;
  finishUpdate(id: number): Promise<ServiceResponse<ServiceMessage>>;
  matchesGoalUpdate(id: number, data: matchUpdateData): Promise<ServiceResponse<ServiceMessage>>;
  create(data: Partial<IMatch>): Promise<ServiceResponse<IMatch>>;
  listHomeTeamSummary(): Promise<ServiceResponse<ILeaderBoard[]>>;
  listAwayTeamSummary(): Promise<ServiceResponse<ILeaderBoard[]>>
}
