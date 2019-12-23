// @ts-nocheck
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
  title: string,
) => {
  const matches = league.nextElementSibling.querySelectorAll('tr');
  const data = [];
  console.info(`Processing ${matches.length} ${title} matches...`);

  const leagueTeams: { [key: string]: any } = await db
    .ref(`/teams/${league}`)
    .once('value')
    .then(teamSnapshot => {
      const teams = teamSnapshot.val();

      return Object.keys(teams).reduce(
        (filteredTeams, teamId) => ({
          ...filteredTeams,
          [teamId]: teams[teamId],
        }),
        {},
      );
    });

  if (matches.length) {
    for (const match of matches) {
      const matchday: string = match
        .getElementsByClassName('zeit')[0]
        .textContent.trim()
        .split('Matchday ')[1];
      const sourceHomeTeamId: string = match
        .getElementsByClassName('verein-heim')[0]
        .firstElementChild.getAttribute('id');
      const sourceAwayTeamId: string = match
        .getElementsByClassName('verein-gast')[0]
        .firstElementChild.getAttribute('id');
      const result = match.getElementsByClassName('finished');

      if (result[0]) {
        const awayTeamId: string = leagueTeams.find(
          ({ sourceId }) => sourceId === sourceAwayTeamId,
        ).id;
        const homeTeamId: string = leagueTeams.find(
          ({ sourceId }) => sourceId === sourceHomeTeamId,
        ).id;

        const score = result[0].textContent.split(':');
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
      .ref(`/matchdays/${league}/2019/${matchdayNumber}`)
      .once('value')
      .then(matchdaySnapshot => {
        if (matchdaySnapshot.exists()) {
          const matchday = matchdaySnapshot.val();
          const currentFixtures = matchday.fixtures;
          const newFixtures = matchdayFixtures[matchdayNumber];
          for (const fixture of newFixtures) {
            const fixtureAlreadyExists = currentFixtures.find(
              ({
                awayTeamId,
                homeTeamId,
              }: {
                awayTeamId: string;
                homeTeamId: string;
              }) => {
                return (
                  awayTeamId === fixture.awayTeamId &&
                  homeTeamId === fixture.homeTeamId
                );
              },
            );

            if (!fixtureAlreadyExists) {
              db.ref(
                `/matchdays/${league}/2019/${+matchdayNumber + 1}/fixtures/${
                  fixture.id
                }`,
              ).set(fixture);
            }
          }
        } else {
          const fixtures = matchdayFixtures[matchdayNumber].reduce(
            (acc, game) => {
              acc[game.id] = game;
              return acc;
            },
            {} as any,
          );
          db.ref(`/matchdays/${league}/2019/${+matchdayNumber + 1}`).set({
            startDate: '',
            endDate: '',
            fixtures,
            matchday: matchdayNumber,
            id: uuid(),
          });
        }
      });
  }
};

exports.scrapeScores = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(() => {
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
        if (!error && response.statusCode == 200) {
          const { document } = new JSDOM(body).window;
          const leagues = document.getElementsByClassName('kategorie');
          if (!admin.apps.length) {
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
              databaseURL: `https://soccer-table-c68e5.firebaseio.com`,
            });
          }
          const db = admin.database();

          for (const league of leagues) {
            const title = league.querySelectorAll('a')[0].getAttribute('title');

            if (title === 'Premier League') {
              console.info('Found Premier League Matches');
              const matchdayFixtures = await extractData(db, league, title);
              pushMatches(db, matchdayFixtures, 'england');
            }
            if (title === 'LaLiga') {
              console.info('Found La Liga Matches');
              const matchdayFixtures = await extractData(db, league, title);
              pushMatches(db, matchdayFixtures, 'spain');
            }
            if (title === 'Bundesliga') {
              console.info('Found Bundesliga Matches');
              const matchdayFixtures = await extractData(db, league, title);
              pushMatches(db, matchdayFixtures, 'germany');
            }
            if (title === 'Serie A') {
              console.info('Found Serie A Matches');
              const matchdayFixtures = await extractData(db, league, title);
              pushMatches(db, matchdayFixtures, 'italy');
            }
            if (title === 'Ligue 1') {
              console.info('Found Ligue 1 Matches');
              const matchdayFixtures = await extractData(db, league, title);
              pushMatches(db, matchdayFixtures, 'france');
            }
          }
        }
      },
    );
  });
