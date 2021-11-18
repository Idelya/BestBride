import React from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import SummarySection from "./SummarySection";
import { Container } from "@mui/material";
import Expenses from "./Expenses";
import { ExpenseContext } from "./ExpenseContext";
import useSWR from "swr";
import request from "../../config/requests";
import { ExpenseCategory } from "../../config/types";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

const fetcher = (url: string) => request.get(url).then((res) => res.data);

export default function BudgetPage() {
  const classes = useStyles();

  const { data: expenseOptions } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };
  console.log(expenseOptions);

  return (
    <ExpenseContext.Provider
      value={{
        expenseOptions: expenseOptions || [],
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
