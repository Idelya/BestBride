import React from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import SummarySection from "./SummarySection";
import { Container } from "@mui/material";

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
      </Container>
    </div>
  );
}
