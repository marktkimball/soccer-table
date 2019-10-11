import React from 'react';
import './spinner.css';
import SoccerBall from '../../assets/soccer-ball.png';

const Spinner = () => (
  <div className="spinner-container">
    <img className="soccer-ball" src={SoccerBall} />
    <h3>Loading Soccer Table...</h3>
  </div>
);

export default Spinner;
