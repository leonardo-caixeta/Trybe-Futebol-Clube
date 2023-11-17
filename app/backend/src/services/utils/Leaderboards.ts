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

const getMatchPoints = (teamA: number, teamB: number): number => {
  if (teamA < teamB) return 0;
  if (teamA === teamB) return 1;
  return 3;
};

const getEfficiency = (points: number, games: number) => +((points / (games * 3)) * 100).toFixed(2);

const goalsBalance = (homeGoals: number, awayGoals: number) => homeGoals - awayGoals;

export default { getMatchPoints, getEfficiency, goalsBalance };
