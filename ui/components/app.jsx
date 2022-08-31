import React, { Fragment } from 'react';
import { Form } from './form';
import { Bill } from './bill';

const App = (props) => {
  console.log('this is my log of props', props);
  return(
    <Fragment>
      <h1>Track Your Rep</h1>
      <p>Viva la revolucion!</p>
      <Form/>
      <Bill/>
    </Fragment>
  )
}

export { App };