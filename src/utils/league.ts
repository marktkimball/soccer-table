export const getLeagueName = (league: string) => {
  switch (league) {
    case 'germany':
      return 'Bundesliga';
    case 'spain':
      return 'La Liga';
    case 'italy':
      return 'Serie A';
    case 'france':
      return 'Ligue 1';
    case 'england':
    default:
      return 'Premier League';
  }
};
