import React, { Fragment, useState, useEffect } from "react";

const BillData = (props) => {
  const [bill, setBill] = useState({});

  // note: need to move state UP, and pass bill data to votingForm.
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/bills');
      const data = await response.json();
      setBill(data);
    }
    getData();
  }, []);

  return (
    <article className="bill">
      <h2>{bill.number}: {bill.short_title}</h2>
      <p><strong>Sponsored by: </strong>{bill.sponsor_title} {bill.sponsor} ({bill.sponsor_party}) of {bill.sponsor_state}</p>
      <p><strong>Introduced:</strong> {bill.introduced_date}</p>
      <p>{bill.summary}</p>
      <p><a href={bill.congressdotgov_url}>Read the bill here</a>.</p>
    </article>
  );
};

export { BillData };