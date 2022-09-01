import React, { Fragment, useState, useEffect } from "react";

const BillData = (props) => {
  const bill = props.activeBill;
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