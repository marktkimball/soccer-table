import React from 'react';
import './table.css';
import { QualificationTypes } from '../../interfaces/qualification-types';
import { Team } from '../../interfaces/team';
import { TeamStats } from '../../interfaces/team-stats';
import { getLeagueName } from '../../utils/league';

interface TableProps {
  beginMatchday: number;
  endMatchday: number;
  handleBeginMatchdayChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleEndMatchdayChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  league: string;
  onTeamSelect: (teamId: string) => void;
  qualificationTypes: QualificationTypes;
  table: TeamStats[];
  teams: { [teamId: string]: Team };
  totalMatchdays: number;
}

export default class Table extends React.Component<TableProps, {}> {
  getQualificationClass = (index: number) => {
    const {
      qualificationTypes: {
        championsLeagueGroup,
        championsLeagueQualifiers,
        europaLeagueGroup,
        europaLeagueQualifiers,
        relegation,
        relegationPlayoff,
      },
    } = this.props;

    if (championsLeagueGroup && championsLeagueGroup.includes(index)) {
      return 'champions-league-group';
    }

    if (
      championsLeagueQualifiers &&
      championsLeagueQualifiers.includes(index)
    ) {
      return 'champions-league-qualifiers';
    }

    if (europaLeagueGroup && europaLeagueGroup.includes(index)) {
      return 'europa-league-group';
    }

    if (europaLeagueQualifiers && europaLeagueQualifiers.includes(index)) {
      return 'europa-league-qualifiers';
    }

    if (relegationPlayoff && relegationPlayoff.includes(index)) {
      return 'relegation-playoff';
    }

    if (relegation && relegation.includes(index)) {
      return 'relegation';
    }

    return '';
  };

  render() {
    const {
      beginMatchday,
      endMatchday,
      handleBeginMatchdayChange,
      handleEndMatchdayChange,
      league,
      onTeamSelect,
      qualificationTypes,
      table,
      teams,
      totalMatchdays,
    } = this.props;

    const matchdayArray = [...Array(totalMatchdays)];

    return (
      <>
        <h1 className="league-header">{getLeagueName(league)} - 2019/2020</h1>
        <p>
          Analyze how teams performed within a range of matchdays be adjusting
          the beginning and ending matchday below.
        </p>
        <div className="filter-selectors-container">
          <label htmlFor="begin-selector" className="matchday-selector-label">
            Beginning Matchday:
            <select
              id="begin-selector"
              className="matchday-selector"
              disabled={!totalMatchdays}
              onChange={handleBeginMatchdayChange}
              value={beginMatchday}
            >
              {matchdayArray.map((e, i) => (
                <option key={i + 1} value={i + 1}>
                  {`Matchday ${i + 1}`}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="end-selector" className="matchday-selector-label">
            Ending Matchday:
            <select
              id="end-selector"
              className="matchday-selector"
              disabled={!totalMatchdays}
              onChange={handleEndMatchdayChange}
              value={endMatchday}
            >
              {matchdayArray.map((e, i) => (
                <option
                  key={i + 1}
                  disabled={beginMatchday > i + 1}
                  value={i + 1}
                >
                  {`Matchday ${i + 1}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="table-grid">
          <div className="table-row">
            <div className="position">Pos.</div>
            <div className="team-name">Club</div>
            <div className="matches-played">MP</div>
            <div className="wins">W</div>
            <div className="draws">D</div>
            <div className="loses">L</div>
            <div className="goals-for">GF</div>
            <div className="goals-against">GA</div>
            <div className="goal-diff">GD</div>
            <div className="points">Pts</div>
          </div>
          {table.map(
            (
              { teamId, goalsAgainst, goalsFor, points, wins, draws, loses },
              index: number,
            ) => {
              const team = teams[teamId];
              const qualificationClass = this.getQualificationClass(index + 1);

              return (
                <div
                  key={teamId}
                  className={`table-row club-row ${qualificationClass}`}
                  onClick={() => onTeamSelect(teamId)}
                >
                  <div className="position">{index + 1}</div>
                  <div className="team-name">
                    <div className="team-logo-container">
                      <img
                        alt={team.displayName}
                        className="team-logo"
                        src={require(`../../assets/logos/${team.logoSrc}`)}
                      />
                    </div>
                    <div>
                      <div className="shortened-name">{team.shortenedName}</div>
                      <div className="full-name">{team.displayName}</div>
                    </div>
                  </div>
                  <div className="matches-played">{wins + draws + loses}</div>
                  <div className="wins">{wins}</div>
                  <div className="draws">{draws}</div>
                  <div className="loses">{loses}</div>
                  <div className="goals-for">{goalsFor}</div>
                  <div className="goals-against">{goalsAgainst}</div>
                  <div className="goal-diff">{goalsFor - goalsAgainst}</div>
                  <div className="points">{points}</div>
                </div>
              );
            },
          )}
        </div>
        <div className="key">
          <h4>Key</h4>
          <div className="key-container">
            <div className="key-item champions-league-key" />
            <p>Champions League</p>
          </div>
          {qualificationTypes.championsLeagueQualifiers && (
            <div className="key-container">
              <div className="key-item champions-league-qualifiers-key" />
              <p>Champions League Qualifiers</p>
            </div>
          )}
          <div className="key-container">
            <div className="key-item europa-league-group-key" />
            <p>Europa League Group</p>
          </div>
          {qualificationTypes.europaLeagueQualifiers && (
            <div className="key-container">
              <div className="key-item europa-league-qualifiers-key" />
              <p>Europa League Qualifiers</p>
            </div>
          )}
          {qualificationTypes.relegationPlayoff && (
            <div className="key-container">
              <div className="key-item relegation-playoff-key" />
              <p>Relegation Playoff</p>
            </div>
          )}
          <div className="key-container">
            <div className="key-item relegation-key" />
            <p>Relegation</p>
          </div>
        </div>
      </>
    );
  }
}
