import React, { Fragment } from "react";
import { BillData } from "./billData";
import { VotingData } from "./votingData";

const DataDisplay = (props) => {
  const activeData = () => {
    if (props.userVote === '') {
      return <BillData activeBill={props.activeBill}/>;
    } else {
      return (
        <VotingData 
          activeRepId={props.activeRepId} 
          activeBill={props.activeBill}
          userVote={props.userVote}
        />
      )
    }
  }
  return(
    <section className="dataDisplay">
      {activeData()}
    </section>
  );
};

export { DataDisplay };