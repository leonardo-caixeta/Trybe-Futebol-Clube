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
  matchesUpdate(id: number, data: matchUpdateData): Promise<ServiceResponse<ServiceMessage>>;
}

export interface IMatchService extends IMatchServiceReader,
  IMatchServiceGetByParam,
  IMatchServiceUpdate { }
