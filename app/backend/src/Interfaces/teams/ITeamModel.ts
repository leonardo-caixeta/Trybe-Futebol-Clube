import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(ID: number): Promise<ITeam | null>
}
