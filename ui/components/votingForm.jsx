import React, { Fragment, useState } from 'react';

const VotingForm = (props) => {
  /* Event handler */
  const handleClick = async (e) => {
    const vote = e.target.className === 'voteYes' ? 'yes': 'no';
    const body = {
      userName: props.activeUser,
      repId: props.activeRepId,
      billId: props.activeBillId,
      vote: vote
    };
    const response = await fetch('http://localhost:3000/api/userVote', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'no-cors' 
      },
      body: JSON.stringify(body)
    })

    props.setUserVote(vote);
  }

  return(
    <div className="votingForm">
      <button className="voteYes" onClick={handleClick}>Yay</button>
      <button className="voteNo" onClick={handleClick}>Nay</button>
    </div>
  )
}
export { VotingForm }