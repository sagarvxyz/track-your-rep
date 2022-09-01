import React, { Fragment, useState } from 'react';

const handleClick = async (e) => {
  const vote = e.target.className === 'voteYes' ? 'yes': 'no';
  const body = {username: 'sagarvxyz', vote: vote};
  const response = await fetch('http://localhost:3000/api/userVote', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'no-cors' 
    },
    body: JSON.stringify(body)
  })
  console.log(await response);
}

const VotingForm = (props) => {
  return(
    <div className="votingForm">
      <button className="voteYes" onClick={handleClick}>Yay</button>
      <button className="voteNo">Nay</button>
    </div>
  )
}
export { VotingForm }