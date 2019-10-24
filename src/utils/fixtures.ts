import filter from 'lodash/filter';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { Fixture, Matchday } from '../interfaces/match-day';
import { TableStats } from '../interfaces/team-stats';

export const mapFixtures = (matchdays: { [key: string]: Matchday }) =>
  reduce(
    matchdays,
    (allFixtures, { fixtures }) => {
      const mappedFixtures = map(fixtures, fixture => fixture);
      return allFixtures.concat(...mappedFixtures);
    },
    [] as Fixture[],
  );

export const getFilteredTeamFixtures = (fixtures: Fixture[], teamId: string) =>
  filter(
    fixtures,
    fixture => fixture.homeTeamId === teamId || fixture.awayTeamId === teamId,
  );

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

export const getTeamFixtures = (
  teamId: string,
  matchdays: { [key: string]: Matchday },
) => {
  const allFixtures = mapFixtures(matchdays);

  const teamFixtures = getFilteredTeamFixtures(allFixtures, teamId);

  return teamFixtures.sort(
    ({ kickOffTime: kickOffTimeA }, { kickOffTime: kickOffTimeB }) => {
      if (kickOffTimeA < kickOffTimeB) {
        return 1;
      }

      return -1;
    },
  );
};
