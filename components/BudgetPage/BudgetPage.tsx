import React from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import SummarySection from "./SummarySection";
import { Container } from "@mui/material";
import Expenses from "./Expenses";
import { ExpenseContext } from "./ExpenseContext";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function BudgetPage() {
  const classes = useStyles();

  return (
    <ExpenseContext.Provider
      value={{
        expenseOptions: [],
      }}
    >
      <div>
        <Banner />
        <Container>
          <SummarySection />
          <Expenses />
        </Container>
      </div>
    </ExpenseContext.Provider>
  );
}
