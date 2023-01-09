declare module "src/data/leagues.json" {
  const leagues: {
    [country: string]: {
      [year: string]: {
        qualificationTypes: {
          [qual: string]: Array<number>;
        };
        teamIds: {
          [teamId: string]: boolean;
        };
      };
    };
  };

  export = leagues;
}
