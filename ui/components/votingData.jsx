import React, { Fragment, useState, useEffect } from "react";

const VotingData = (props) => {
  const [activeVoteData, setActiveVoteData] = useState({});
  const [totalVotes, setTotalVotes] = useState({});
  useEffect(() => {
    const getData = async () => {
      const params = `repId=${props.activeRepId}&billId=${props.activeBill.bill_id}`;
      console.log(params);
      const response = await fetch(
        `http://localhost:8080/api/memberVote?${params}`
      );
      const data = await response.json();
      setActiveVoteData(await data);
      setTotalVotes({
        yes: await data.total.yes,
        no: await data.total.no
      })
    };
    getData();
  }, []);
  const bill = props.activeBill;

  return (
    <article className="votingData">
      <h2>{bill.short_title}</h2>
      <p><strong>You voted:</strong> {props.userVote}</p>
      <p><strong>Your Rep voted:</strong>{activeVoteData.position}</p>
      <p>This bill {activeVoteData.result} on {activeVoteData.date} with {totalVotes.yes} votes for and {totalVotes.no} against.</p>
    </article>
  );
};

export { VotingData };