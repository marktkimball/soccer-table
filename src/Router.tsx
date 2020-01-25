import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ScrollToTop from './ScrollToTop';

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

export default Router;
