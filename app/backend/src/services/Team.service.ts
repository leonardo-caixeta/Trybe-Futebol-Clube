import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/Team.model';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamService } from '../Interfaces/teams/ITeamService';

export default class TeamService implements ITeamService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  async findById(id: number): Promise<ServiceResponse<ITeams | ServiceMessage>> {
    const oneTeam = await this.teamModel.findById(id);
    if (!oneTeam) {
      return { status: 'NOT_FOUND', data: { message: `Wrong or inexistent id: ${id} ` } };
    }

    return { status: 'SUCCESSFUL', data: oneTeam };
  }
}
