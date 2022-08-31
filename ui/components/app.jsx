import React, { Fragment } from 'react';
import { ActionDisplay } from './actionDisplay';
import { DataDisplay } from './dataDisplay';

const App = (props) => {
  return(
    <div className="app">
      <h1>Track Your Rep</h1>
      <ActionDisplay/>
      <DataDisplay/>
    </div>
  );
};

export { App };