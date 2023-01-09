import getLeagueData from "./getLeagueData";
import rawMatchdaysData from "../data/matchdays";

export const getTableData = (country: string, year: string) => {
  const { qualificationTypes, teams } = getLeagueData(country, year);
  const matchdays = rawMatchdaysData[country][year];
  const totalMatchdays = matchdays.length;

  return {
    matchdays,
    qualificationTypes,
    teams,
    totalMatchdays,
  };
};

export default getTableData;
