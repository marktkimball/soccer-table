import {
  getFilteredTeamFixtures,
  getTeamGoalStats,
  mapFixtures,
} from './fixtures';
import { Matchday } from '../interfaces/match-day';
import { TeamStats } from '../interfaces/team-stats';
import { Team } from '../interfaces/team';

export const getTable = (
  matchdays: { [key: string]: Matchday },
  teams: { [key: string]: Team },
): TeamStats[] => {
  const fixtures = mapFixtures(matchdays);

  const teamStats = Object.keys(teams).map(teamId => {
    const teamFixtures = getFilteredTeamFixtures(fixtures, teamId);
    return { teamId: teamId, ...getTeamGoalStats(teamFixtures, teamId) };
  });

  return teamStats.sort(
    (
      { points: pointsA, goalsFor: goalsForA, goalsAgainst: goalsAgainstA },
      { points: pointsB, goalsFor: goalsForB, goalsAgainst: goalsAgainstB },
    ) => {
      const teamAGoalDiff = goalsForA - goalsAgainstA;
      const teamBGoalDiff = goalsForB - goalsAgainstB;

      if (pointsA > pointsB) {
        return -1;
      }

      if (pointsB > pointsA) {
        return 1;
      }

      if (teamAGoalDiff > teamBGoalDiff) {
        return -1;
      }

      if (teamBGoalDiff > teamAGoalDiff) {
        return 1;
      }

      if (goalsForA > goalsForB) {
        return -1;
      }

      return 1;
    },
  );
};
