import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
  origin: true,
});
const serviceAccount = require('../service-account.json');

const getLeagueData = async (
  db: admin.database.Database,
  country: string,
  year: string,
) => {
  const {
    qualificationTypes,
    teamIds: teamIdsObject,
  }: {
    qualificationTypes: { [key: string]: { [key: string]: number } };
    teamIds: { [key: string]: string };
  } = await db
    .ref(`/leagues/${country}/${year}`)
    .once('value')
    .then(leaugeSnapshot => leaugeSnapshot.val());

  const teamIds = Object.keys(teamIdsObject);
  const formattedTeams: { [key: string]: any } = await db
    .ref(`/teams/${country}`)
    .once('value')
    .then(teamSnapshot => {
      const teams = teamSnapshot.val();

      return Object.keys(teams)
        .filter(id => teamIds.includes(id))
        .reduce(
          (filteredTeams, teamId) => ({
            ...filteredTeams,
            [teamId]: teams[teamId],
          }),
          {},
        );
    });

  const formattedQualificationTypes: { [key: string]: number[] } = {};

  for (const [key, val] of Object.entries(qualificationTypes)) {
    formattedQualificationTypes[key] = Object.values(val);
  }

  return {
    qualificationTypes: formattedQualificationTypes,
    teams: formattedTeams,
  };
};

export const getTableData = functions.https.onRequest(async (req, res) => {
  const { country, league, year } = req.query;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://soccer-table-c68e5.firebaseio.com`,
    });
  }
  const db = admin.database();

  const { qualificationTypes, teams } = await getLeagueData(db, country, year);

  return cors(req, res, () =>
    db
      .ref(`/matchdays/${league}/${year}`)
      .once('value')
      .then(matchdaySnapshot => {
        const matchdays = matchdaySnapshot.val();
        if (matchdaySnapshot.exists()) {
          const totalMatchdays = Object.keys(matchdays).length;

          res.status(200).send({
            matchdays,
            qualificationTypes,
            teams,
            totalMatchdays,
          });
        }

        res.status(200).send({
          matchdays: {},
          qualificationTypes,
          teams,
          totalMatchdays: 0,
        });
      }),
  );
});
