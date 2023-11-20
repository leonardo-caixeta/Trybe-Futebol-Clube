import MatchModel from '../models/Match.model';
import { IMatchService } from '../Interfaces/matches/IMatchService';
import { ServiceMessage, ServiceResponse } from '../Types/ServiceResponse.type';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamModel from '../models/Team.model';
import MatchValidation from './validations/Match.validation';
import { ILeaderBoard } from '../Interfaces/matches/ILeaderBoards';
import * as Leaderboards from './utils/Leaderboards';
import { matchUpdateData } from '../Types/Matches.type';

export type ServiceMessageRole = { role: string };
export default class MatchService implements IMatchService {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async findByQuery(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByQuery(query === 'true');
    return { status: 'SUCCESSFUL', data: matches };
  }

  async listHomeTeamSummary(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listHomeTeamSummarize();
    const data = Object.values(matches.reduce<Record<string, ILeaderBoard>>((acc, match) => {
      const matchPoints = Leaderboards.getMatchPoints(match.homeTeamGoals, match.awayTeamGoals);
      acc[`${match.homeTeamId}`] = Leaderboards.upsertLeaderboard({
        name: match.homeTeam.teamName,
        totalPoints: matchPoints,
        totalGames: 1,
        totalVictories: matchPoints === 3 ? 1 : 0,
        totalDraws: matchPoints === 1 ? 1 : 0,
        totalLosses: matchPoints === 0 ? 1 : 0,
        goalsFavor: match.homeTeamGoals,
        goalsOwn: match.awayTeamGoals,
        goalsBalance: Leaderboards.goalsBalance(match.homeTeamGoals, match.awayTeamGoals),
        efficiency: Leaderboards.getEfficiency(matchPoints, 1),
      }, acc[`${match.homeTeamId}`]);

      return acc;
    }, {}));

    return { status: 'SUCCESSFUL', data: Leaderboards.sortLeaderboard(data) };
  }

  async listAwayTeamSummary(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listAwayTeamSummarize();
    const data = Object.values(matches.reduce<Record<string, ILeaderBoard>>((acc, match) => {
      const matchPoints = Leaderboards.getMatchPoints(match.awayTeamGoals, match.homeTeamGoals);
      acc[`${match.awayTeamId}`] = Leaderboards.upsertLeaderboard({
        name: match.awayTeam.teamName,
        totalPoints: matchPoints,
        totalGames: 1,
        totalVictories: matchPoints === 3 ? 1 : 0,
        totalDraws: matchPoints === 1 ? 1 : 0,
        totalLosses: matchPoints === 0 ? 1 : 0,
        goalsFavor: match.awayTeamGoals,
        goalsOwn: match.homeTeamGoals,
        goalsBalance: Leaderboards.goalsBalance(match.awayTeamGoals, match.homeTeamGoals),
        efficiency: Leaderboards.getEfficiency(matchPoints, 1),
      }, acc[`${match.awayTeamId}`]);

      return acc;
    }, {}));

    return { status: 'SUCCESSFUL', data: Leaderboards.sortLeaderboard(data) };
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

  async create(data: Partial<IMatch>): Promise<ServiceResponse<IMatch>> {
    const validation = MatchValidation.validateMatch(data, await this.teamModel.findAll());
    if (validation) return validation;

    const match = await this.matchModel.create(data);

    return { status: 'CREATED', data: match };
  }
}
