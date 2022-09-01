import React, { Fragment, useState, useEffect } from 'react';
import { ActionDisplay } from './actionDisplay';
import { DataDisplay } from './dataDisplay';

const App = (props) => {

  /* STATE */
  const [activeUser, setActiveUser] = useState({});
  const [rep, setRep] = useState({});
  const [activeBill, setActiveBill] = useState({});
  const [userDidVote, setUserDidVote] = useState(false);

  useEffect(() => setActiveUser('sagarvxyz'), []); // DEV NOTE: !hardcoded username

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/reps'); // DEV NOTE: !hardcoded rep_id in the server, should move up to client and send as POST
      const data = await response.json();
      setRep(data);
    };
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/bills'); // DEV NOTE: should pass in repID in body, AND update server route to query using it
      const data = await response.json();
      setActiveBill(data);
    }
    getData();
  }, []);

  return(
    <div className="app">
      <header>
        <h1>Track Your Rep</h1>
        <p>Your rep is: <strong>{rep.first_name} {rep.last_name}</strong></p>
      </header>
      <ActionDisplay 
        activeRepId={rep.id} 
        activeUser={activeUser} 
        activeBillId={activeBill.bill_id}
        setUserDidVote={setUserDidVote}
      />
      <DataDisplay activeBill={activeBill}/>
    </div>
  );
};

export { App };