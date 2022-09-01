import React, { Fragment } from "react";
import { VotingForm } from "./votingForm";

const ActionDisplay = (props) => {
  return(
    <section className="actionDisplay">
      <VotingForm/>
    </section>
  );
};

export { ActionDisplay };