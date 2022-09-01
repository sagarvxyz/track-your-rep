import React, { Fragment } from "react";
import { BillData } from "./billData";

const DataDisplay = (props) => {
  return(
    <section className="dataDisplay">
      <BillData/>
    </section>
  );
};

export { DataDisplay };