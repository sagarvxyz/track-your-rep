import React, { Fragment, useState, useEffect } from 'react';
import { ActionDisplay } from './actionDisplay';
import { DataDisplay } from './dataDisplay';

const App = (props) => {
  //DEV NOTE: !hardcoded rep_id, but it should populate when a user log's in
  const [rep, setRep] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/reps');
      const data = await response.json();
      setRep(data);
    };
    getData();
  }, [])

  return(
    <div className="app">
      <header>
        <h1>Track Your Rep</h1>
        <p>Your rep is: <strong>{rep.first_name} {rep.last_name}</strong></p>
      </header>
      <ActionDisplay/>
      <DataDisplay/>
    </div>
  );
};

export { App };