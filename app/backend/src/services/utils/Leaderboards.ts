/*
total de pontos
|-> win time +3
    loss time 0
    draw +1
|
aproveitamento do time
|-> [P/ (J * 3)] * 100

saldo de gols
|-> gols a favor - gols sofridos
*/

import { ILeaderBoard } from '../../Interfaces/matches/ILeaderBoards';

export const getMatchPoints = (teamA: number, teamB: number): number => {
  if (teamA < teamB) return 0;
  if (teamA === teamB) return 1;
  return 3;
};

export const getEfficiency = (points: number, games: number) => (
  +((points / (games * 3)) * 100).toFixed(2)
);

export const goalsBalance = (homeGoals: number, awayGoals: number) => homeGoals - awayGoals;

export const sortLeaderboard = (leaderBoards: ILeaderBoard[]) => {
  leaderBoards.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    return b.goalsFavor - a.goalsFavor;
  });
  return leaderBoards;
};

export const upsertLeaderboard = (
  stats: ILeaderBoard,
  leaderBoard?: ILeaderBoard,
) => {
  if (!leaderBoard) return stats;
  const newLeaderBoard = { ...leaderBoard }; // Ô Trybe, tira a tal da regra do parâmetro, tive hacer gambiarra >.<
  newLeaderBoard.totalGames += 1;
  newLeaderBoard.totalDraws += stats.totalDraws;
  newLeaderBoard.totalLosses += stats.totalLosses;
  newLeaderBoard.totalVictories += stats.totalVictories;
  newLeaderBoard.totalPoints += stats.totalPoints;
  newLeaderBoard.goalsFavor += stats.goalsFavor;
  newLeaderBoard.goalsOwn += stats.goalsOwn;
  newLeaderBoard.goalsBalance = goalsBalance(newLeaderBoard.goalsFavor, newLeaderBoard.goalsOwn);
  newLeaderBoard.efficiency = getEfficiency(newLeaderBoard.totalPoints, newLeaderBoard.totalGames);
  return newLeaderBoard;
};
