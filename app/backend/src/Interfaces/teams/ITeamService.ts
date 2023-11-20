import { ServiceMessage, ServiceResponse } from '../../Types/ServiceResponse.type';
import { ITeam } from './ITeam';

export interface ITeamService {
  findAll(): Promise<ServiceResponse<ITeam[]>>
  findById(id: number): Promise<ServiceResponse<ITeam | ServiceMessage>>
}
