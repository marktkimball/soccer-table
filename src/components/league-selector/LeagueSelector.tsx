import React from 'react';
import { Link } from 'react-router-dom';

import './league-selector.css';

interface LeagueSelectorProps {
  leagues: string[];
  selectedLeague: string;
}

export const LeagueSelector: React.SFC<LeagueSelectorProps> = ({
  leagues,
  selectedLeague,
}) => {
  return (
    <div className="league-selector">
      {leagues.map(league => (
        <Link
          className={`league-selector-button ${
            selectedLeague === league ? 'is-selected' : ''
          }`}
          key={league}
          to={`/league/${league}`}
        >
          <span className="league-name">{league}</span>
          <span className="league-name-truncated">{league.slice(0, 3)}</span>
        </Link>
      ))}
    </div>
  );
};
