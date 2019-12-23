import React from 'react';
import './team-profile.css';
import { SparklineChart } from '../sparkline-chart/sparkline-chart';
import groundIcon from '../../assets/icons/ground.svg';
import mapPinIcon from '../../assets/icons/map-pin.svg';
import { Matchday } from '../../interfaces/match-day';
import { Team } from '../../interfaces/team';
import { getTeamFixtures, getTeamGoalStats } from '../../utils/fixtures';
import { getLeagueName } from '../../utils/league';

interface TeamProfileProps {
  league: string;
  matchdays: { [key: string]: Matchday };
  onBackClick: () => void;
  placement: number;
  team: Team;
  teams: { [key: string]: Team };
}

const ordinalPlacement = (placement: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = placement % 100;
  return placement + (s[(v - 20) % 10] || s[v] || s[0]);
};

const TeamProfile: React.SFC<TeamProfileProps> = ({
  league,
  matchdays,
  onBackClick,
  placement,
  team,
  teams,
}) => {
  const teamFixtures = getTeamFixtures(team.id, matchdays);
  const teamStats = getTeamGoalStats(teamFixtures, team.id);
  const results = teamFixtures.reduce(
    (
      { fixtures, points },
      { goalsAway, goalsHome, homeTeamId, ...rest },
      i,
    ) => {
      const isHomeTeam = homeTeamId === team.id;
      const currentPoints = points[i - 1] || 0;

      if (
        (isHomeTeam && goalsHome > goalsAway) ||
        (!isHomeTeam && goalsAway > goalsHome)
      ) {
        fixtures.push({
          goalsAway,
          goalsHome,
          homeTeamId,
          isHomeTeam,
          result: 'W',
          ...rest,
        });
        points.push(currentPoints + 3);
      } else if (goalsHome === goalsAway) {
        fixtures.push({
          goalsAway,
          goalsHome,
          homeTeamId,
          isHomeTeam,
          result: 'D',
          ...rest,
        });
        points.push(currentPoints + 1);
      } else {
        fixtures.push({
          goalsAway,
          goalsHome,
          homeTeamId,
          isHomeTeam,
          result: 'L',
          ...rest,
        });
        points.push(currentPoints);
      }

      return { fixtures, points };
    },
    { fixtures: [] as any[], points: [] as number[] },
  );

  const pointsArray = [];
  const maxPointsArray: number[] = [];
  const leagueGamesCount = league === 'germany' ? 34 : 38;

  for (let i = 0; i < leagueGamesCount; i++) {
    if (i === 0) {
      const startingMaxPoints =
        results.points[0] === 3 ? 114 : results.points[0] === 1 ? 112 : 111;
      maxPointsArray.push(
        league === 'germany' ? startingMaxPoints - 12 : startingMaxPoints,
      );
    } else {
      const pointsToDeduct = !results.fixtures[i]
        ? 0
        : results.fixtures[i].result === 'W'
        ? 0
        : results.fixtures[i].result === 'L'
        ? 3
        : 2;
      maxPointsArray.push(maxPointsArray[i - 1] - pointsToDeduct);
    }
    if (typeof results.points[i] === 'number') {
      pointsArray.push(results.points[i]);
    } else {
      const lastGameIndex = results.fixtures.length - 1;
      pointsArray.push(results.points[lastGameIndex]);
    }
  }

  return (
    <div className="team-profile-container">
      <h4 className="team-profile-back-button" onClick={onBackClick}>
        Back
      </h4>
      <div className="team-profile-header">
        <div className="team-profile-logo-container">
          <img
            alt={team.displayName}
            className="team-profile-logo"
            src={require(`../../assets/logos/${team.logoSrc}`)}
          />
        </div>
        <div className="team-profile-data">
          <h1 className="team-profile-display-name">{team.displayName}</h1>
          <div className="team-profile-info-line">
            <img
              alt="ground-icon"
              className="team-profile-info-icon ground-icon"
              src={groundIcon}
            />
            <p>{team.ground}</p>
          </div>
          <div className="team-profile-info-line">
            <img
              alt="location-icon"
              className="team-profile-info-icon"
              src={mapPinIcon}
            />
            <p>{team.location}</p>
          </div>
          <div className="team-profile-record-row">
            <p>
              {teamStats.wins}-{teamStats.draws}-{teamStats.loses},
            </p>
            <p>
              {ordinalPlacement(placement)} in {getLeagueName(league)}
            </p>
          </div>
        </div>
      </div>
      <SparklineChart
        height={160}
        hoverLineColor="#444"
        maxPoints={maxPointsArray}
        maxPointsColor="#808080"
        teamPoints={pointsArray}
        teamPointsColor="#43A047"
        width={400}
      />
      <div>
        <h3 className="results-header">Results</h3>
        <div className="fixtures-container">
          {results.fixtures.map(
            ({
              awayTeamId,
              goalsAway,
              goalsHome,
              homeTeamId,
              id,
              isHomeTeam,
              kickOffTime,
              result,
            }) => {
              const date = new Date(kickOffTime);

              return (
                <div key={id} className="fixture-row">
                  <p className="fixture-row-item fixture-row-date">
                    {`${date.toLocaleString('default', {
                      month: 'short',
                    })} ${date.getDate()}`}
                  </p>
                  <div className="fixture-row-result">
                    <p className="fixture-row-item">
                      {isHomeTeam
                        ? `vs. ${teams[awayTeamId].displayName}`
                        : `at ${teams[homeTeamId].displayName}`}
                    </p>
                    <p className="fixture-row-item fixture-row-score">{`${result} ${goalsHome} - ${goalsAway}`}</p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
