import leagues from "../data/leagues";
import teams from "../data/teams";

export const getLeagueData = (country: string, year: string) => {
  const { qualificationTypes, teamIds: teamIdsObject } = leagues[country][year];
  const leagueTeams = teams[country];
  const teamIds = Object.keys(teamIdsObject);

  const formattedTeams = Object.keys(leagueTeams)
    .filter((id) => teamIds.includes(id))
    .reduce(
      (filteredTeams, teamId) => ({
        ...filteredTeams,
        [teamId]: leagueTeams[teamId],
      }),
      {}
    );

  const formattedQualificationTypes: { [key: string]: number[] } = {};

  for (const [key, val] of Object.entries(qualificationTypes)) {
    formattedQualificationTypes[key] = Object.values(val);
  }

  return {
    qualificationTypes: formattedQualificationTypes,
    teams: formattedTeams,
  };
};

export default getLeagueData;
