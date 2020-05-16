import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from "./routes/Route";

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
