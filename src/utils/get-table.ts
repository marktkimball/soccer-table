import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { Fixture, Matchday } from '../interfaces/match-day';
import { TableStats, TeamStats } from '../interfaces/team-stats';
import { Team } from '../interfaces/team';

export const getTable = (
  matchdays: { [key: string]: Matchday },
  teams: { [key: string]: Team },
): TeamStats[] => {
  const fixtures = reduce(
    matchdays,
    (allFixtures, { fixtures }) => {
      const mappedFixtures = map(fixtures, fixture => fixture);
      return allFixtures.concat(...mappedFixtures);
    },
    [] as Fixture[],
  );

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

export const getFilteredTeamFixtures = (fixtures: Fixture[], teamId: string) =>
  fixtures.filter(
    fixture => fixture.homeTeamId === teamId || fixture.awayTeamId === teamId,
  );

export const getPointsFromFixture = ({
  goalsAway,
  goalsHome,
}: Fixture): { awayTeamPoints: number; homeTeamPoints: number } => {
  if (goalsHome === goalsAway) {
    return { awayTeamPoints: 1, homeTeamPoints: 1 };
  }

  if (goalsHome > goalsAway) {
    return { awayTeamPoints: 0, homeTeamPoints: 3 };
  }

  return { awayTeamPoints: 3, homeTeamPoints: 0 };
};

export const determineFixturePoints = (
  { goalsAway, goalsHome, homeTeamId, awayTeamId }: Fixture,
  teamId: string,
): number => {
  if (goalsHome === goalsAway) {
    return 1;
  }

  if (
    (homeTeamId === teamId && goalsHome > goalsAway) ||
    (awayTeamId === teamId && goalsAway > goalsHome)
  ) {
    return 3;
  }

  return 0;
};

export const getTeamGoalStats = (
  fixtures: Fixture[],
  teamId: string,
): TableStats => {
  return fixtures.reduce(
    ({ draws, goalsAgainst, goalsFor, loses, points, wins }, fixture) => {
      const fixturePoints = determineFixturePoints(fixture, teamId);

      if (fixture.awayTeamId === teamId) {
        return {
          draws: draws + (fixturePoints === 1 ? 1 : 0),
          goalsAgainst: goalsAgainst + fixture.goalsHome,
          goalsFor: goalsFor + fixture.goalsAway,
          loses: loses + (fixturePoints === 0 ? 1 : 0),
          points: points + fixturePoints,
          wins: wins + (fixturePoints === 3 ? 1 : 0),
        };
      }

      return {
        draws: draws + (fixturePoints === 1 ? 1 : 0),
        goalsAgainst: goalsAgainst + fixture.goalsAway,
        goalsFor: goalsFor + fixture.goalsHome,
        loses: loses + (fixturePoints === 0 ? 1 : 0),
        points: points + fixturePoints,
        wins: wins + (fixturePoints === 3 ? 1 : 0),
      };
    },
    {
      draws: 0,
      goalsAgainst: 0,
      goalsFor: 0,
      loses: 0,
      points: 0,
      wins: 0,
    },
  );
};
