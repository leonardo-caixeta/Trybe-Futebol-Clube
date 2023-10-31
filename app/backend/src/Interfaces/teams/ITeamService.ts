import { ServiceMessage, ServiceResponse } from '../ServiceResponse';
import { ITeams } from './ITeams';

export interface ITeamServiceReader {
  findAll(): Promise<ServiceResponse<ITeams[]>>
  findById(id: number): Promise<ServiceResponse<ITeams | ServiceMessage>>
}

export type ITeamService = ITeamServiceReader;
