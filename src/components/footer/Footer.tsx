import React from 'react';
import './footer.css';

export const Footer: React.SFC<{}> = () => (
  <footer>
    {`© ${new Date().getFullYear()} MK Engineering. All rights reserved.`}
  </footer>
);
