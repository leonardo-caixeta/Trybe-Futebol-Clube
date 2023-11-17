import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatches } from '../../Interfaces/matches/IMatches';
import { ITeams } from '../../Interfaces/teams/ITeams';

const validateMatch = (data: Partial<IMatches>, dataToCheck: ITeams[]):
ServiceResponse<IMatches> | null => {
  const { homeTeamId, awayTeamId } = data;
  if (homeTeamId === awayTeamId) {
    return {
      status: 'CONFLICT',
      data: { message: 'It is not possible to create a match with two equal teams' },
    };
  }

  const mapedTeams = dataToCheck.map(({ id }) => id);
  const existHomeTeam = mapedTeams.some((teamId) => homeTeamId === teamId);
  const existAwayTeam = mapedTeams.some((teamId) => awayTeamId === teamId);
  if (!existAwayTeam || !existHomeTeam) {
    return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
  }

  return null;
};

export default { validateMatch };
