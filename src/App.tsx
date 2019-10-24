import React from 'react';
import './app.css';
import Spinner from './components/spinner/Spinner';
import { LeagueSelector } from './components/league-selector/LeagueSelector';
import Table from './components/table/Table';
import TeamProfile from './components/team-profile/TeamProfile';
import { Header } from './components/header/Header';
import { Matchday } from './interfaces/match-day';
import { QualificationTypes } from './interfaces/qualification-types';
import { Team } from './interfaces/team';

interface AppState {
  beginMatchday: number;
  cachedTableData: {
    [country: string]: {
      [year: string]: {
        matchdays: { [matchdayId: string]: Matchday };
        qualificationTypes: QualificationTypes;
        teams: { [teamId: string]: Team };
        totalMatchdays: number;
      };
    };
  };
  endMatchday: number;
  leagues: string[];
  loaded: boolean;
  matchdays: { [matchdayId: string]: Matchday };
  qualificationTypes: QualificationTypes;
  selectedLeague: string;
  selectedTeamId: string;
  teams: { [teamId: string]: Team };
  totalMatchdays: number;
  year: string;
}

interface FetchResponse {
  matchdays: { [matchdayId: string]: Matchday };
  qualificationTypes: QualificationTypes;
  teams: { [teamId: string]: Team };
  totalMatchdays: number;
}

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    beginMatchday: 1,
    cachedTableData: {},
    endMatchday: 1,
    leagues: ['england', 'spain', 'germany', 'italy', 'france'],
    loaded: false,
    matchdays: {},
    qualificationTypes: {},
    selectedLeague: 'england',
    selectedTeamId: '',
    teams: {},
    totalMatchdays: 1,
    year: '2019',
  };

  componentDidMount() {
    const params = new URL(document.location.href).searchParams;
    const countryParam = params.get('country');
    if (countryParam) {
      this.setState({ selectedLeague: countryParam }, () =>
        this.getAndSetTableData(countryParam),
      );
    } else {
      this.getAndSetTableData(this.state.selectedLeague);
    }
  }

  getAndSetTableData = async (selectedLeague: string) => {
    const {
      cachedTableData,
      selectedLeague: previousSelectedLeague,
      year,
    } = this.state;
    const {
      matchdays,
      qualificationTypes,
      teams,
      totalMatchdays,
    } = await this.getTableData(selectedLeague, year);

    this.setState({
      beginMatchday: 1,
      cachedTableData: {
        ...cachedTableData,
        [selectedLeague]: {
          [year]: {
            matchdays,
            qualificationTypes,
            teams,
            totalMatchdays,
          },
        },
      },
      endMatchday: totalMatchdays,
      loaded: true,
      matchdays,
      qualificationTypes,
      selectedLeague,
      teams,
      totalMatchdays,
    });

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(previousSelectedLeague);
    body.classList.add(selectedLeague);
  };

  onLeagueSelect = (selectedLeague: string) => {
    this.getAndSetTableData(selectedLeague);
  };

  onTeamSelect = (selectedTeamId: string) => {
    this.setState({ selectedTeamId });
    const team = this.state.teams[selectedTeamId];
    const deg = Math.floor(Math.random() * 360);
    const newBackground = team
      ? `linear-gradient(${deg}deg, ${team.primaryColor} 60%, #fff 60%, #fff 70%, ${team.secondaryColor} 60%)`
      : '';

    document.getElementsByTagName('body')[0].style.background = newBackground;
  };

  getTableData = (country: string, year: string): Promise<FetchResponse> => {
    const { cachedTableData } = this.state;
    if (
      cachedTableData &&
      cachedTableData[country] &&
      cachedTableData[country][year]
    ) {
      return Promise.resolve(cachedTableData[country][year]);
    }

    return fetch(
      `https://us-central1-soccer-table-c68e5.cloudfunctions.net/getTableData?country=${country}&league=${country}&year=${year}`,
    ).then(res => res.json());
  };

  handleBeginMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { endMatchday } = this.state;
    const beginMatchday = +event.currentTarget.value;
    const setEndMatchday = beginMatchday > endMatchday;

    this.setState({
      beginMatchday,
      endMatchday: setEndMatchday ? beginMatchday : endMatchday,
    });
  };

  handleEndMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ endMatchday: +event.currentTarget.value });
  };

  render() {
    const {
      beginMatchday,
      endMatchday,
      leagues,
      loaded,
      matchdays,
      qualificationTypes,
      selectedLeague,
      selectedTeamId,
      teams,
      totalMatchdays,
    } = this.state;

    return (
      <div className="app">
        <Header onClick={() => this.onTeamSelect('')} />
        {loaded ? (
          <div className="main-container">
            {selectedTeamId ? (
              <TeamProfile
                matchdays={matchdays}
                onBackClick={() => this.onTeamSelect('')}
                team={teams[selectedTeamId]}
                teams={teams}
              />
            ) : (
              <>
                <LeagueSelector
                  leagues={leagues}
                  onChange={this.onLeagueSelect}
                  selectedLeague={selectedLeague}
                />
                <Table
                  beginMatchday={beginMatchday}
                  endMatchday={endMatchday}
                  handleBeginMatchdayChange={this.handleBeginMatchdayChange}
                  handleEndMatchdayChange={this.handleEndMatchdayChange}
                  league={selectedLeague}
                  matchdays={matchdays}
                  onTeamSelect={this.onTeamSelect}
                  qualificationTypes={qualificationTypes}
                  teams={teams}
                  totalMatchdays={totalMatchdays}
                />
              </>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}
