import React from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import SummarySection from "./SummarySection";
import { Container } from "@mui/material";
import Expenses from "./Expenses";

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
      <Container>
        <SummarySection />
        <Expenses />
      </Container>
    </div>
  );
}
