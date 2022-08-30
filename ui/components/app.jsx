import React, { Fragment } from 'react';
import { VotingForm } from './votingForm'

const App = (props) => {
  return(
    <Fragment>
      <h1>Track Your Rep</h1>
      <p>Viva la revolucion!</p>
      <VotingForm/>
    </Fragment>
  )
}

export { App };