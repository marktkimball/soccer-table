import React from 'react';
import './team-profile.css';
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
      <div>
        <h3 className="results-header">Results</h3>
        {teamFixtures.map(
          ({
            awayTeamId,
            goalsAway,
            goalsHome,
            homeTeamId,
            id,
            kickOffTime,
          }) => {
            const date = new Date(kickOffTime);
            const isHomeTeam = homeTeamId === team.id;
            const result =
              (isHomeTeam && goalsHome > goalsAway) ||
              (!isHomeTeam && goalsAway > goalsHome)
                ? 'W'
                : goalsHome === goalsAway
                ? 'D'
                : 'L';

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
  );
};

export default TeamProfile;
