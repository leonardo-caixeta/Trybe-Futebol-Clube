import { IMatch } from '../Interfaces/matches/IMatch';

export type HomeTeamIncluded = { homeTeam: { teamName: string } };

export type AwayTeamIncluded = { awayTeam: { teamName: string } };

export type IMatchHomeTeam = IMatch & HomeTeamIncluded;

export type IMatchAwayTeam = IMatch & AwayTeamIncluded;

export type matchUpdateData = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};
