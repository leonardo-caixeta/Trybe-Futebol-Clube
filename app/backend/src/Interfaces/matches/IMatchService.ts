import { matchUpdateData } from '../../Types/Matches.type';
import { ServiceMessage, ServiceResponse } from '../../Types/ServiceResponse.type';
import { IMatch } from './IMatch';

export interface IMatchServiceReader {
  findAll(): Promise<ServiceResponse<IMatch[]>>
  findById?(id: number): Promise<ServiceResponse<IMatch | ServiceMessage>>
}

export interface IMatchServiceGetByParam {
  findByQuery(query: string): Promise<ServiceResponse<IMatch[]>>
}

export interface IMatchServiceUpdate {
  finishUpdate(id: number): Promise<ServiceResponse<ServiceMessage>>;
  matchesGoalUpdate(id: number, data: matchUpdateData): Promise<ServiceResponse<ServiceMessage>>;
}

export interface IMatchServiceCreate {
  create(data: Partial<IMatch>): Promise<ServiceResponse<IMatch>>
}

export interface IMatchService extends IMatchServiceReader,
  IMatchServiceGetByParam,
  IMatchServiceCreate,
  IMatchServiceUpdate { }
