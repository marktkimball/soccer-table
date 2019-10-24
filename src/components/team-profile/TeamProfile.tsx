import React from 'react';
import './team-profile.css';
import { getTeamFixtures, getTeamGoalStats } from '../../utils/fixtures';
import { Matchday } from '../../interfaces/match-day';
import { Team } from '../../interfaces/team';

interface TeamProfileProps {
  matchdays: { [key: string]: Matchday };
  onBackClick: () => void;
  team: Team;
  teams: { [key: string]: Team };
}

const TeamProfile: React.SFC<TeamProfileProps> = ({
  matchdays,
  onBackClick,
  team,
  teams,
}) => {
  const teamFixtures = getTeamFixtures(team.id, matchdays);
  const teamStats = getTeamGoalStats(teamFixtures, team.id);

  return (
    <div className="team-profile-container">
      <h4 className="team-profile-back-button" onClick={onBackClick}>
        ← Back
      </h4>
      <div className="team-profile-header">
        <img
          alt={team.displayName}
          className="team-profile-logo"
          src={require(`../../assets/logos/${team.logoSrc}`)}
        />
        <div className="team-profile-data">
          <h1 className="team-profile-display-name">{team.displayName}</h1>
          <p>{team.ground}</p>
          <p>{team.location}</p>
          <p>
            {teamStats.wins}-{teamStats.draws}-{teamStats.loses}
          </p>
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
