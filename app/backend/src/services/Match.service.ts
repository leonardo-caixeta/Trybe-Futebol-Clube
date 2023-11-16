import MatchModel from '../models/Match.model';
import { IMatchService } from '../Interfaces/matches/IMatchService';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { matchUpdateData } from '../Interfaces/CRUD/ICRUDModel';
import validateMatch from './validations/Match.validation';
import TeamModel from '../models/Team.model';

export type ServiceMessageRole = { role: string };
export default class MatchService implements IMatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async findByQuery(query: string): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchModel.findByQuery(query === 'true');
    return { status: 'SUCCESSFUL', data: matches };
  }

  async finishUpdate(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishUpdate(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async matchesGoalUpdate(id: number, data: matchUpdateData):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.matchesGoalUpdate(id, data);

    return { status: 'SUCCESSFUL', data: { message: 'Match goals updated' } };
  }

  async create(data: Partial<IMatches>): Promise<ServiceResponse<IMatches>> {
    const validation = validateMatch(data, await this.teamModel.findAll());
    if (validation) return validation;

    const match = await this.matchModel.create(data);

    return { status: 'CREATED', data: match };
  }
}
