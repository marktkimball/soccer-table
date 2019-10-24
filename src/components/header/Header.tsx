import React from 'react';
import './header.css';
import SoccerBall from '../../assets/soccer-ball.png';

interface HeaderProps {
  onClick: () => void;
}

export const Header: React.SFC<HeaderProps> = ({ onClick }) => (
  <header>
    <div className="header-logo-container" onClick={onClick}>
      <img className="header-logo" alt="Soccer Ball" src={SoccerBall} />
      <h2 className="header-logo-text">SoccerStandings.app</h2>
    </div>
  </header>
);
