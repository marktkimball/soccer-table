import React from 'react';
import './header.css';
import SoccerBall from '../../assets/soccer-ball.png';

export const Header: React.SFC<{}> = () => (
  <header>
    <img className="header-logo" alt="Soccer Ball" src={SoccerBall} />
    <h2>SoccerStandings.app</h2>
  </header>
);
