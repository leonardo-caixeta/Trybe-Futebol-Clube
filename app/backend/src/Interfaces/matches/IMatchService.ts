import { matchUpdateData } from '../CRUD/ICRUDModel';
import { ServiceMessage, ServiceResponse } from '../ServiceResponse';
import { IMatches } from './IMatches';

export interface IMatchServiceReader {
  findAll(): Promise<ServiceResponse<IMatches[]>>
  findById?(id: number): Promise<ServiceResponse<IMatches | ServiceMessage>>
}

export interface IMatchServiceGetByParam {
  findByQuery(query: string): Promise<ServiceResponse<IMatches[]>>
}

export interface IMatchServiceUpdate {
  finishUpdate(id: number): Promise<ServiceResponse<ServiceMessage>>;
  matchesGoalUpdate(id: number, data: matchUpdateData): Promise<ServiceResponse<ServiceMessage>>;
}

export interface IMatchServiceCreate {
  create(data: Partial<IMatches>): Promise<ServiceResponse<IMatches>>
}

export interface IMatchService extends IMatchServiceReader,
  IMatchServiceGetByParam,
  IMatchServiceCreate,
  IMatchServiceUpdate { }
