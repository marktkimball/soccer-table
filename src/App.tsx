import React from 'react';
import Spinner from './components/spinner/Spinner';
import Table from './components/table/Table';
import { Matchday } from './interfaces/match-day';
import { Team } from './interfaces/team';

interface AppState {
  loaded: boolean;
  matchdays: { [key: string]: Matchday };
  teams: { [key: string]: Team };
  totalMatchdays: number;
}

export default class App extends React.Component<{}, AppState> {
  state = {
    loaded: false,
    matchdays: {},
    teams: {},
    totalMatchdays: 1,
  };

  async componentDidMount() {
    const { matchdays, teams, totalMatchdays } = await this.getTableData();

    this.setState({
      loaded: true,
      matchdays,
      teams,
      totalMatchdays,
    });
  }

  getTableData = (): Promise<AppState> =>
    fetch(
      'https://us-central1-soccer-table-c68e5.cloudfunctions.net/getTableData?country=england&league=england&year=2019',
    ).then(res => res.json());

  render() {
    const { loaded, matchdays, teams, totalMatchdays } = this.state;

    return (
      <div className="App">
        {loaded ? (
          <Table
            matchdays={matchdays}
            teams={teams}
            totalMatchdays={totalMatchdays}
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
