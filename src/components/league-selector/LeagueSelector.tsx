import React from 'react';
import './league-selector.css';

interface LeagueSelectorProps {
  leagues: string[];
  onChange: (league: string) => void;
  selectedLeague: string;
}

export const LeagueSelector: React.SFC<LeagueSelectorProps> = ({
  leagues,
  onChange,
  selectedLeague,
}) => {
  return (
    <div className="league-selector">
      {leagues.map(league => (
        <button
          className={`league-selector-button ${
            selectedLeague === league ? 'is-selected' : ''
          }`}
          key={league}
          onClick={event => onChange(league)}
        >
          {league}
        </button>
      ))}
    </div>
  );
};
