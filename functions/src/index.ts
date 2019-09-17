import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
  origin: true,
});
const serviceAccount = require('../service-account.json');

export const getTableData = functions.https.onRequest((req, res) => {
  const { country, league, year } = req.query;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://soccer-table-c68e5.firebaseio.com`,
    });
  }
  const db = admin.database();

  return cors(req, res, () =>
    db
      .ref(`/teams/${country}`)
      .once('value')
      .then(snapshot => {
        const teams = snapshot.val();

        return db
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
          });
      }),
  );
});
