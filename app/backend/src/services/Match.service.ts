import MatchModel from '../models/Match.model';
import { IMatchService } from '../Interfaces/matches/IMatchService';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { matchUpdateData } from '../Interfaces/CRUD/ICRUDModel';

export type ServiceMessageRole = { role: string };
export default class MatchService implements IMatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async findByQuery(query: string): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findByQuery(query);

    return { status: 'SUCCESSFUL', data: matches };
  }

  async finishUpdate(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishUpdate(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async matchesUpdate(id: number, data: matchUpdateData): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.matchesUpdate(id, data);

    return { status: 'SUCCESSFUL', data: { message: 'Match finished' } };
  }
}
