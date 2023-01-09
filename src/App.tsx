import React from "react";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import pickBy from "lodash/pickBy";
import memoize from "memoize-one";
import * as firebase from "firebase/app";

import "./app.css";

import Spinner from "./components/spinner/Spinner";
import { LeagueSelector } from "./components/league-selector/LeagueSelector";
import Table from "./components/table/Table";
import TeamProfile from "./components/team-profile/TeamProfile";
import { Header } from "./components/header/Header";
import { Matchday } from "./interfaces/match-day";
import { QualificationTypes } from "./interfaces/qualification-types";
import { Team } from "./interfaces/team";
import { TeamStats } from "./interfaces/team-stats";
import { getTable } from "./utils/get-table";
import getTableData from "./utils/getTableData";

interface AppState {
  beginMatchday: number;
  cachedTableData: {
    [country: string]: {
      [year: string]: {
        matchdays: Array<Matchday>;
        qualificationTypes: QualificationTypes;
        teams: { [teamId: string]: Team };
        totalMatchdays: number;
      };
    };
  };
  endMatchday: number;
  leagues: string[];
  loaded: boolean;
  matchdays: Array<Matchday>;
  normalTable: TeamStats[];
  qualificationTypes: QualificationTypes;
  selectedLeague: string;
  teams: { [teamId: string]: Team };
  totalMatchdays: number;
  year: string;
}

interface FetchResponse {
  matchdays: Array<Matchday>;
  qualificationTypes: QualificationTypes;
  teams: { [teamId: string]: Team };
  totalMatchdays: number;
}

class App extends React.Component<RouteComponentProps, AppState> {
  state: AppState = {
    beginMatchday: 1,
    cachedTableData: {},
    endMatchday: 1,
    leagues: ["england", "spain", "germany", "italy", "france"],
    loaded: false,
    matchdays: [],
    normalTable: [],
    qualificationTypes: {},
    selectedLeague: "england",
    teams: {},
    totalMatchdays: 1,
    year: "2019",
  };

  filter = memoize((matchdays, teams) => getTable(matchdays, teams));

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props;
    const urlArray = pathname.split("/");
    const league =
      urlArray[urlArray.indexOf("league") + 1] || this.state.selectedLeague;

    this.setState({ selectedLeague: league }, () =>
      this.getAndSetTableData(league)
    );
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const {
      location: { pathname: nextPathname },
    } = this.props;
    const {
      location: { pathname: prevPathname },
    } = prevProps;
    const nextUrlArray = nextPathname.split("/");
    const prevUrlArray = prevPathname.split("/");
    const nextLeague = nextUrlArray[nextUrlArray.indexOf("league") + 1];
    const prevLeague = prevUrlArray[prevUrlArray.indexOf("league") + 1];

    if (nextLeague !== prevLeague) {
      this.onLeagueSelect(nextLeague);
    }
  }

  getAndSetTableData = (selectedLeague: string) => {
    const {
      cachedTableData,
      selectedLeague: previousSelectedLeague,
      year,
    } = this.state;
    const { matchdays, qualificationTypes, teams, totalMatchdays } =
      this.getTableData(selectedLeague, year);
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

    const body = document.getElementsByTagName("body")[0];
    body.classList.remove(previousSelectedLeague);
    body.classList.add(selectedLeague);

    this.setState({ normalTable: this.filter(matchdays, teams) });
  };

  onLeagueSelect = (selectedLeague: string) => {
    this.getAndSetTableData(selectedLeague);

    firebase.analytics().logEvent("select_league", {
      league: selectedLeague,
    });
  };

  getTableData = (country: string, year: string): FetchResponse => {
    const t0 = performance.now();
    const { cachedTableData } = this.state;

    if (
      cachedTableData &&
      cachedTableData[country] &&
      cachedTableData[country][year]
    ) {
      const t1 = performance.now();

      firebase.analytics().logEvent("fetch_table_data", {
        fromCache: true,
        timing: t1 - t0,
      });

      return cachedTableData[country][year];
    }

    const t1 = performance.now();

    firebase.analytics().logEvent("fetch_table_data", {
      fromCache: false,
      timing: t1 - t0,
    });

    return getTableData(country, year);
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
      .logEvent("change_begin_matchday", { beginMatchday, endMatchday });
  };

  handleEndMatchdayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const endMatchday = +event.currentTarget.value;
    this.setState({ endMatchday });

    firebase.analytics().logEvent("change_end_matchday", {
      endMatchday,
      beginMatchday: this.state.beginMatchday,
    });
  };

  onBackButtonClick = (source: string) => {
    const { selectedLeague } = this.state;
    this.props.history.push(`/league/${selectedLeague}`);
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
      teams,
      totalMatchdays,
    } = this.state;

    const filteredMatchdays = matchdays.slice(
      beginMatchday - 1,
      endMatchday - 1
    );
    const filteredTable: TeamStats[] = this.filter(filteredMatchdays, teams);

    return (
      <div className="app">
        <Header onClick={() => this.onBackButtonClick("header_logo")} />
        {loaded ? (
          <div className="main-container">
            <Switch>
              <Redirect exact from="/" to="/league/england" />
              <Route exact path="/league/:country">
                <>
                  <LeagueSelector
                    leagues={leagues}
                    selectedLeague={selectedLeague}
                  />
                  <Table
                    beginMatchday={beginMatchday}
                    endMatchday={endMatchday}
                    handleBeginMatchdayChange={this.handleBeginMatchdayChange}
                    handleEndMatchdayChange={this.handleEndMatchdayChange}
                    league={selectedLeague}
                    qualificationTypes={qualificationTypes}
                    table={filteredTable}
                    teams={teams}
                    totalMatchdays={totalMatchdays}
                  />
                </>
              </Route>
              <Route path="/league/:country/team/:teamId">
                <TeamProfile
                  league={selectedLeague}
                  matchdays={matchdays}
                  normalTable={normalTable}
                  onBackClick={() =>
                    this.onBackButtonClick("team_profile_back_button")
                  }
                  teams={teams}
                />
              </Route>
            </Switch>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default withRouter(App);
