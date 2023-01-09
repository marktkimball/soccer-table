export interface Matchday {
  id: string;
  matchday: number;
  startDate: string;
  endDate: string;
  fixtures: { [fixtureId: string]: Fixture };
}

export interface Fixture {
  id?: string;
  kickOffTime: string;
  homeTeamId: string;
  awayTeamId: string;
  goalsHome: number;
  goalsAway: number;
}
