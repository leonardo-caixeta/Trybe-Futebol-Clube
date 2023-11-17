import MatchModel from '../models/Match.model';
import { IMatchService } from '../Interfaces/matches/IMatchService';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { matchUpdateData } from '../Interfaces/CRUD/ICRUDModel';
import TeamModel from '../models/Team.model';
import MatchValidation from './validations/Match.validation';
import { ILeaderBoard } from '../Interfaces/matches/ILeaderBoards';
import Leaderboards from './utils/Leaderboards';

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

  // --------------------

  private static upsertLeaderboard(
    stats: ILeaderBoard,
    leaderBoard?: ILeaderBoard,
  ) {
    if (!leaderBoard) return stats;
    const newLeaderBoard = { ...leaderBoard }; // Ô Trybe, tira a tal da regra do parâmetro, tive hacer gambiarra >.<
    newLeaderBoard.totalGames += 1;
    newLeaderBoard.totalDraws += stats.totalDraws;
    newLeaderBoard.totalLosses += stats.totalLosses;
    newLeaderBoard.totalVictories += stats.totalVictories;
    newLeaderBoard.totalPoints += stats.totalPoints;
    newLeaderBoard.goalsFavor += stats.goalsFavor;
    newLeaderBoard.goalsOwn += stats.goalsOwn;
    newLeaderBoard.goalsBalance = Leaderboards
      .goalsBalance(newLeaderBoard.goalsFavor, newLeaderBoard.goalsOwn);
    newLeaderBoard.efficiency = Leaderboards
      .getEfficiency(newLeaderBoard.totalPoints, newLeaderBoard.totalGames);
    return newLeaderBoard;
  }

  private static sortLeaderboard(leaderBoards: ILeaderBoard[]) {
    leaderBoards.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return leaderBoards;
  }

  async listHomeTeamSummary(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.listHomeTeamSummarize();
    const data = Object.values(matches.reduce<Record<string, ILeaderBoard>>((acc, match) => {
      const matchPoints = Leaderboards.getMatchPoints(match.homeTeamGoals, match.awayTeamGoals);
      acc[`${match.homeTeamId}`] = MatchService.upsertLeaderboard({
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

    return { status: 'SUCCESSFUL', data: MatchService.sortLeaderboard(data) };
  }

  // --------------------

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
    const validation = MatchValidation.validateMatch(data, await this.teamModel.findAll());
    if (validation) return validation;

    const match = await this.matchModel.create(data);

    return { status: 'CREATED', data: match };
  }
}
