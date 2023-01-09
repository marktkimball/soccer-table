import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as firebase from "firebase/app";

import "./team-profile.css";

import { SparklineChart } from "../sparkline-chart/sparkline-chart";
import groundIcon from "../../assets/icons/ground.svg";
import mapPinIcon from "../../assets/icons/map-pin.svg";
import { Matchday } from "../../interfaces/match-day";
import { Team } from "../../interfaces/team";
import { TeamStats } from "../../interfaces/team-stats";
import { getTeamFixtures, getTeamGoalStats } from "../../utils/fixtures";
import { getLeagueName } from "../../utils/league";

interface TeamProfileProps {
  league: string;
  matchdays: Array<Matchday>;
  normalTable: TeamStats[];
  onBackClick: () => void;
  teams: { [key: string]: Team };
}

interface TeamProfileState {
  team: Team;
}

const ordinalPlacement = (placement: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = placement % 100;
  return placement + (s[(v - 20) % 10] || s[v] || s[0]);
};

class TeamProfile extends React.Component<
  TeamProfileProps & RouteComponentProps<{}>,
  TeamProfileState
> {
  constructor(props: TeamProfileProps & RouteComponentProps<{}>) {
    super(props);

    const {
      location: { pathname },
    } = this.props;
    const urlArray = pathname.split("/");
    const teamId = urlArray[urlArray.indexOf("team") + 1];
    const team = this.props.teams[teamId];

    this.state = {
      team,
    };
  }

  componentDidMount() {
    const { team } = this.state;
    const deg = Math.floor(Math.random() * 360);

    document.getElementsByTagName(
      "body"
    )[0].style.background = `linear-gradient(${deg}deg, ${team.primaryColor} 0%, #fff 70%, ${team.secondaryColor} 100%)`;

    firebase.analytics().logEvent("select_team", {
      teamName: team.displayName,
      teamId: team.id,
    });
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "";
  }

  render() {
    const { league, matchdays, normalTable, onBackClick, teams } = this.props;
    const { team } = this.state;

    const placement =
      normalTable.findIndex(({ teamId }) => teamId === team.id) + 1;
    const teamFixtures = getTeamFixtures(team.id, matchdays);
    const teamStats = getTeamGoalStats(teamFixtures, team.id);
    const results = teamFixtures.reduce(
      (
        { fixtures, points },
        { goalsAway, goalsHome, homeTeamId, ...rest },
        i
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
            result: "W",
            ...rest,
          });
          points.push(currentPoints + 3);
        } else if (goalsHome === goalsAway) {
          fixtures.push({
            goalsAway,
            goalsHome,
            homeTeamId,
            isHomeTeam,
            result: "D",
            ...rest,
          });
          points.push(currentPoints + 1);
        } else {
          fixtures.push({
            goalsAway,
            goalsHome,
            homeTeamId,
            isHomeTeam,
            result: "L",
            ...rest,
          });
          points.push(currentPoints);
        }

        return { fixtures, points };
      },
      { fixtures: [] as any[], points: [] as number[] }
    );

    const pointsArray = [];
    const maxPointsArray: number[] = [];
    const leagueGamesCount = league === "germany" ? 34 : 38;

    for (let i = 0; i < leagueGamesCount; i++) {
      if (i === 0) {
        const startingMaxPoints =
          results.points[0] === 3 ? 114 : results.points[0] === 1 ? 112 : 111;
        maxPointsArray.push(
          league === "germany" ? startingMaxPoints - 12 : startingMaxPoints
        );
      } else {
        const pointsToDeduct = !results.fixtures[i]
          ? 0
          : results.fixtures[i].result === "W"
          ? 0
          : results.fixtures[i].result === "L"
          ? 3
          : 2;
        maxPointsArray.push(maxPointsArray[i - 1] - pointsToDeduct);
      }
      if (typeof results.points[i] === "number") {
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
                      {`${date.toLocaleString("default", {
                        month: "short",
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
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TeamProfile);
