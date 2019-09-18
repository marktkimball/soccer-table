import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
  origin: true,
});
const serviceAccount = require('../service-account.json');

const getTeamsForLeagueYear = async (
  db: admin.database.Database,
  country: string,
  year: string,
) => {
  const teamIds = await db
    .ref(`/leagues/${country}/${year}/teamIds`)
    .once('value')
    .then(teamIdsSnapshot => Object.keys(teamIdsSnapshot.val()));

  return await db
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

  const teams = await getTeamsForLeagueYear(db, country, year);

  return cors(req, res, () =>
    db
      .ref(`/matchdays/${league}/${year}`)
      .once('value')
      .then(matchdaySnapshot => {
        const matchdays = matchdaySnapshot.val();
        const totalMatchdays = Object.keys(matchdays).length;

        res.status(200).send({
          matchdays,
          teams,
          totalMatchdays,
        });
      }),
  );
});
