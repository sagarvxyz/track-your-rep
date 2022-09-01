import React, { Fragment, useState, useEffect } from "react";

const BillData = (props) => {
  const bill = props.activeBill;
  return (
    <article className="bill">
      <h2>{bill.number}: {bill.short_title}</h2>
      <p>
        <em>Sponsored by {bill.sponsor_title} {bill.sponsor} ({bill.sponsor_party}) of {bill.sponsor_state} on {bill.introduced_date}</em>.
      </p>
      <p>{bill.summary}</p>
      <p><a href={bill.congressdotgov_url} target="_blank">Read the bill here</a>.</p>
    </article>
  );
};

export { BillData };