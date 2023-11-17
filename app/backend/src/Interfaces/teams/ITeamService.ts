import { ServiceMessage, ServiceResponse } from '../../Types/ServiceResponse.type';
import { ITeam } from './ITeam';

export interface ITeamServiceReader {
  findAll(): Promise<ServiceResponse<ITeam[]>>
  findById(id: number): Promise<ServiceResponse<ITeam | ServiceMessage>>
}

export type ITeamService = ITeamServiceReader;
