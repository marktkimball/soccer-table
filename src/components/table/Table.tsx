import React from 'react';
import pickBy from 'lodash/pickBy';
import './table.css';
import { Matchday } from '../../interfaces/match-day';
import { Team } from '../../interfaces/team';
import { TeamStats } from '../../interfaces/team-stats';
import { getTable } from '../../utils/get-table';

interface TableState {
  beginMatchday: number;
  endMatchday: number;
  filteredTable: TeamStats[];
}

interface TableProps {
  matchdays: { [key: string]: Matchday };
  teams: { [key: string]: Team };
  totalMatchdays: number;
}

export default class Table extends React.Component<TableProps, TableState> {
  state = {
    beginMatchday: 1,
    endMatchday: this.props.totalMatchdays,
    filteredTable: [],
  };

  componentDidMount() {
    const filteredTable = getTable(this.props.matchdays, this.props.teams);
    this.setState({ filteredTable });
  }

  handleBeginMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { endMatchday } = this.state;
    const beginMatchday = +event.currentTarget.value;
    const setEndMatchday = beginMatchday > endMatchday;

    this.setState(
      {
        beginMatchday,
        endMatchday: setEndMatchday ? beginMatchday : endMatchday,
      },
      this.updateTable,
    );
  };

  handleEndMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(
      { endMatchday: +event.currentTarget.value },
      this.updateTable,
    );
  };

  updateTable = () => {
    const { beginMatchday, endMatchday } = this.state;
    const { matchdays, teams } = this.props;
    const filteredMatchdays = pickBy(
      matchdays,
      ({ matchday }) => matchday >= beginMatchday && matchday <= endMatchday,
    );

    this.setState({ filteredTable: getTable(filteredMatchdays, teams) });
  };

  render() {
    const { beginMatchday, endMatchday, filteredTable } = this.state;
    const { teams, totalMatchdays } = this.props;
    const matchdayArray = [...Array(totalMatchdays)];

    return (
      <div className="table-container">
        <h1 className="league-header">English Premier League - 2019/2020</h1>
        <p>
          Analyze how teams performed within a range of matchdays be adjusting
          the beginning and ending matchday with the dropdowns below.
        </p>
        <div className="filter-selectors-container">
          <label htmlFor="begin-selector" className="matchday-selector-label">
            Beginning Matchday:
            <select
              id="begin-selector"
              className="matchday-selector"
              onChange={this.handleBeginMatchdayChange}
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
              onChange={this.handleEndMatchdayChange}
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
          {filteredTable.map(
            (
              { teamId, goalsAgainst, goalsFor, points, wins, draws, loses },
              index: number,
            ) => {
              const team = teams[teamId];

              return (
                <div key={teamId} className="table-row club-row">
                  <div className="position">{index + 1}</div>
                  <div className="team-name">
                    <img
                      alt={team.displayName}
                      className="team-logo"
                      src={require(`../../assets/logos/${team.logoSrc}`)}
                    />
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
          <div className="key-container">
            <div className="key-item uefa-league-key" />
            <p>UEFA League</p>
          </div>
          <div className="key-container">
            <div className="key-item relegation-key" />
            <p>Relegation</p>
          </div>
        </div>
      </div>
    );
  }
}
