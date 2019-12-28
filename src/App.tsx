import React from 'react';
import pickBy from 'lodash/pickBy';
import memoize from 'memoize-one';
import * as firebase from 'firebase/app';

import './app.css';

import Spinner from './components/spinner/Spinner';
import { LeagueSelector } from './components/league-selector/LeagueSelector';
import Table from './components/table/Table';
import TeamProfile from './components/team-profile/TeamProfile';
import { Header } from './components/header/Header';
import { Matchday } from './interfaces/match-day';
import { QualificationTypes } from './interfaces/qualification-types';
import { Team } from './interfaces/team';
import { TeamStats } from './interfaces/team-stats';
import { getTable } from './utils/get-table';

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
  normalTable: TeamStats[];
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
    normalTable: [],
    qualificationTypes: {},
    selectedLeague: 'england',
    selectedTeamId: '',
    teams: {},
    totalMatchdays: 1,
    year: '2019',
  };

  filter = memoize((matchdays, teams) => getTable(matchdays, teams));

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

    this.setState({ normalTable: this.filter(matchdays, teams) });
  };

  onLeagueSelect = (selectedLeague: string) => {
    this.getAndSetTableData(selectedLeague);

    firebase.analytics().logEvent('select_league', {
      league: selectedLeague,
    });
  };

  onTeamSelect = (selectedTeamId: string) => {
    window.scrollTo(0, 0);

    this.setState({ selectedTeamId });

    const team = this.state.teams[selectedTeamId];
    const deg = Math.floor(Math.random() * 360);
    const newBackground = team
      ? `linear-gradient(${deg}deg, ${team.primaryColor} 0%, #fff 70%, ${team.secondaryColor} 100%)`
      : '';

    document.getElementsByTagName('body')[0].style.background = newBackground;

    if (team) {
      firebase.analytics().logEvent('select_team', {
        teamName: team.displayName,
        teamId: selectedTeamId,
      });
    }
  };

  getTableData = (country: string, year: string): Promise<FetchResponse> => {
    const t0 = performance.now();
    const { cachedTableData } = this.state;

    if (
      cachedTableData &&
      cachedTableData[country] &&
      cachedTableData[country][year]
    ) {
      const t1 = performance.now();

      firebase.analytics().logEvent('fetch_table_data', {
        fromCache: true,
        timing: t1 - t0,
      });

      return Promise.resolve(cachedTableData[country][year]);
    }

    return fetch(
      `https://us-central1-soccer-table-c68e5.cloudfunctions.net/getTableData?country=${country}&league=${country}&year=${year}`,
    ).then(res => {
      const t1 = performance.now();

      firebase.analytics().logEvent('fetch_table_data', {
        fromCache: false,
        timing: t1 - t0,
      });

      return res.json();
    });
  };

  handleBeginMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { endMatchday } = this.state;
    const beginMatchday = +event.currentTarget.value;
    const setEndMatchday = beginMatchday > endMatchday;

    this.setState({
      beginMatchday,
      endMatchday: setEndMatchday ? beginMatchday : endMatchday,
    });

    firebase
      .analytics()
      .logEvent('change_begin_matchday', { beginMatchday, endMatchday });
  };

  handleEndMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const endMatchday = +event.currentTarget.value;
    this.setState({ endMatchday });

    firebase.analytics().logEvent('change_end_matchday', {
      endMatchday,
      beginMatchday: this.state.beginMatchday,
    });
  };

  onBackButtonClick = (source: string) => {
    this.onTeamSelect('');
    firebase.analytics().logEvent(`${source}_click`);
  };

  render() {
    const {
      beginMatchday,
      endMatchday,
      leagues,
      loaded,
      matchdays,
      normalTable,
      qualificationTypes,
      selectedLeague,
      selectedTeamId,
      teams,
      totalMatchdays,
    } = this.state;

    const filteredMatchdays = pickBy(
      matchdays,
      ({ matchday }) => matchday >= beginMatchday && matchday <= endMatchday,
    );
    const filteredTable: TeamStats[] = this.filter(filteredMatchdays, teams);

    return (
      <div className="app">
        <Header onClick={() => this.onBackButtonClick('header_logo')} />
        {loaded ? (
          <div className="main-container">
            {selectedTeamId ? (
              <TeamProfile
                league={selectedLeague}
                matchdays={matchdays}
                onBackClick={() =>
                  this.onBackButtonClick('team_profile_back_button')
                }
                placement={
                  normalTable.findIndex(
                    ({ teamId }) => teamId === selectedTeamId,
                  ) + 1
                }
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
                  onTeamSelect={this.onTeamSelect}
                  qualificationTypes={qualificationTypes}
                  table={filteredTable}
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
