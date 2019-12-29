import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';
import * as jsdom from 'jsdom';
import * as request from 'request';

const { JSDOM } = jsdom;

const url = 'https://www.transfermarkt.com/ticker/index/live';

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
        if (matchdaySnapshot.exists()) {
          const matchdays = matchdaySnapshot.val();
          const totalMatchdays = Object.keys(matchdays).length;

          return res.status(200).send({
            matchdays,
            qualificationTypes,
            teams,
            totalMatchdays,
          });
        }

        return res.status(200).send({
          matchdays: {},
          qualificationTypes,
          teams,
          totalMatchdays: 0,
        });
      }),
  );
});

const extractData = async (
  db: admin.database.Database,
  league: Element,
  country: string,
  title: string,
) => {
  const matches =
    league.nextElementSibling &&
    league.nextElementSibling.querySelectorAll('tr');
  const data = [];
  if (matches) {
    console.info(`Processing ${matches.length} ${title} matches...`);

    const leagueTeams: { [key: string]: any } = await db
      .ref(`/teams/${country}`)
      .once('value')
      .then(teamSnapshot => {
        const teams = teamSnapshot.val();

        return Object.values(teams);
      });

    if (matches && matches.length) {
      for (const match of matches) {
        const matchday: string = match
          .getElementsByClassName('zeit')[0]
          .textContent!.trim()
          .split('Matchday ')[1];
        const sourceHomeTeamId: string = match
          .getElementsByClassName('verein-heim')[0]
          .firstElementChild!.getAttribute('id') as string;
        const sourceAwayTeamId: string = match
          .getElementsByClassName('verein-gast')[0]
          .firstElementChild!.getAttribute('id') as string;
        const result = match.getElementsByClassName('finished');

        if (result[0]) {
          const awayTeamId: string = leagueTeams.find(
            ({ sourceId }: { sourceId: string }) =>
              sourceId === sourceAwayTeamId,
          ).id;
          const homeTeamId: string = leagueTeams.find(
            ({ sourceId }: { sourceId: string }) =>
              sourceId === sourceHomeTeamId,
          ).id;

          const score = result[0].textContent!.split(':');
          const date = new Date();
          date.setHours(date.getHours() - 2);

          const fixtureData = {
            awayTeamId,
            goalsAway: +score[1],
            goalsHome: +score[0],
            homeTeamId,
            id: uuid(),
            kickOffTime: date.toISOString(),
            matchday,
          };
          data.push(fixtureData);
        }
      }
    }

    return data.reduce((acc, { matchday, ...rest }) => {
      if (acc[matchday]) {
        acc[matchday].push(rest);
      } else {
        acc[matchday] = [rest];
      }

      return acc;
    }, {} as any);
  }
};

const pushMatches = async (
  db: admin.database.Database,
  matchdayFixtures: {
    [matchday: string]: {
      awayTeamId: string;
      goalsAway: number;
      goalsHome: number;
      homeTeamId: string;
      id: string;
      kickOffTime: string;
    }[];
  },
  league: string,
) => {
  const matchdays = Object.keys(matchdayFixtures);

  for (const matchdayNumber of matchdays) {
    await db
      .ref(`/matchdays/${league}/2019/${+matchdayNumber - 1}`)
      .once('value')
      .then(matchdaySnapshot => {
        if (matchdaySnapshot.exists()) {
          const matchday = matchdaySnapshot.val();
          const fixtureArr: {
            awayTeamId: string;
            homeTeamId: string;
          }[] = Object.values(matchday.fixtures);
          const newFixtures = matchdayFixtures[matchdayNumber];

          newFixtures.forEach(fixture => {
            const fixtureAlreadyExists = fixtureArr.find(
              ({ awayTeamId, homeTeamId }) => {
                return (
                  awayTeamId === fixture.awayTeamId &&
                  homeTeamId === fixture.homeTeamId
                );
              },
            );

            if (!fixtureAlreadyExists) {
              return db
                .ref(
                  `/matchdays/${league}/2019/${+matchdayNumber - 1}/fixtures/${
                    fixture.id
                  }`,
                )
                .set(fixture);
            }

            return Promise.resolve();
          });

          return Promise.resolve();
        } else {
          const fixtures = matchdayFixtures[matchdayNumber].reduce(
            (acc, game) => {
              acc[game.id] = game;
              return acc;
            },
            {} as any,
          );

          return db
            .ref(`/matchdays/${league}/2019/${+matchdayNumber - 1}`)
            .set({
              endDate: '',
              fixtures,
              id: uuid(),
              matchday: +matchdayNumber,
              startDate: '',
            });
        }
      });
  }
};

exports.scrapeScores = functions.https.onRequest(async (req, res) => {
  console.info('BEGINNING SCORE SCRAPING', new Date());

  request(
    {
      url,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      },
    },
    async (error, response, body) => {
      if (error) {
        console.info('ERROR DURING FUNCTION EXECUTION', error);
      }

      if (!error && response.statusCode === 200) {
        const { document } = new JSDOM(body).window;
        const leagues = document.getElementsByClassName('kategorie');

        /*
         * seenCount prevents the data extraction happening in error for
         * leagues we don't care about that have the same name (i.e. Ghana Premier League)
         */
        const seenCount = {
          england: 0,
          france: 0,
          germany: 0,
          italy: 0,
          spain: 0,
        };

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://soccer-table-c68e5.firebaseio.com`,
          });
        }
        const db = admin.database();

        for (const league of leagues) {
          const title = league.querySelectorAll('a')[0].getAttribute('title');

          if (title === 'Premier League' && seenCount.england === 0) {
            console.info('Found Premier League Matches');

            const matchdayFixtures = await extractData(
              db,
              league,
              'england',
              title,
            );
            await pushMatches(db, matchdayFixtures, 'england');

            seenCount.england = 1;
          }
          if (title === 'LaLiga' && seenCount.spain === 0) {
            console.info('Found La Liga Matches');

            const matchdayFixtures = await extractData(
              db,
              league,
              'spain',
              title,
            );
            await pushMatches(db, matchdayFixtures, 'spain');

            seenCount.spain = 1;
          }
          if (title === 'Bundesliga' && seenCount.germany === 0) {
            console.info('Found Bundesliga Matches');

            const matchdayFixtures = await extractData(
              db,
              league,
              'germany',
              title,
            );
            await pushMatches(db, matchdayFixtures, 'germany');

            seenCount.germany = 1;
          }
          if (title === 'Serie A' && seenCount.italy === 0) {
            console.info('Found Serie A Matches');

            const matchdayFixtures = await extractData(
              db,
              league,
              'italy',
              title,
            );
            await pushMatches(db, matchdayFixtures, 'italy');

            seenCount.italy = 1;
          }
          if (title === 'Ligue 1' && seenCount.france === 0) {
            console.info('Found Ligue 1 Matches');

            const matchdayFixtures = await extractData(
              db,
              league,
              'france',
              title,
            );
            await pushMatches(db, matchdayFixtures, 'france');

            seenCount.france = 1;
          }
        }

        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    },
  );
});
