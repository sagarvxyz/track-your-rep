import React, { Fragment } from "react";
import { VotingForm } from "./votingForm";

const ActionDisplay = (props) => {
  return(
    <section className="actionDisplay">
      <VotingForm 
        activeUser={props.activeUser} 
        activeRepId={props.activeRepId}
        activeBillId={props.activeBillId}
        setUserDidVote={props.setUserDidVote}
        />
    </section>
  );
};

export { ActionDisplay };