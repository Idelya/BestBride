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
import axios from "axios";
import { number } from "yup/lib/locale";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export interface StatsCount {
  expensesCount: number;
  expensesPlanned: number;
  expensesRealized: number;
}

export interface StatsSum {
  budget: number;
  freeFunds: number;
  paymentSum: number;
  plannedPaymentSum: number;
}

const fetcher = (url: string) => request.get(url).then((res) => res.data);
const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);

export default function BudgetPage() {
  const classes = useStyles();

  const { data: expenseOptions } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };

  const { data: budgetSummary } = useSWR("api/budget", fetcherAuth) as {
    data: StatsCount & StatsSum;
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenseOptions: expenseOptions || [],
        budgetStats: budgetSummary,
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
