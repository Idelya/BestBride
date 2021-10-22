import React from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function BudgetPage() {
  const classes = useStyles();
  return (
    <div>
      <Banner />
    </div>
  );
}
