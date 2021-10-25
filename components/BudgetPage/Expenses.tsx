import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Heading from "../Heading";
import { Theme } from "@mui/system";
import Divider from "../Divider";
import { Grid, Button } from "@mui/material";
import ExpenseSummary from "./ExpenseSummary";
import AddIcon from "@mui/icons-material/Add";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../config/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    summary: {
      display: "flex",
      justifyContent: "flex-end",
    },
    btn: {
      "& *": {
        textTransform: "none",
      },
    },
  })
);

const data: Expense[] = [
  {
    id: 1,
    name: "Rzecz 1",
    price: 300,
    paymentDate: "4 listopada",
    status: "opłacone",
  },
  {
    id: 2,
    name: "Rzecz 2",
    price: 300,
    paymentDate: "4 listopada",
    status: "opłacone",
  },
  {
    id: 3,
    name: "Rzecz 3",
    price: 300,
    paymentDate: "9 listopada",
    status: "zaplanowane",
  },
];
export default function Expenses() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider textAlign="right">Wydatki</Divider>
      <Grid container>
        <Grid item md={12} className={classes.summary}>
          <ExpenseSummary />
        </Grid>
        <Grid item md={12} className={classes.btn}>
          <Button startIcon={<AddIcon />}>Dodaj wydatek</Button>
        </Grid>
        <Grid item md={12}>
          <ExpensesList expenses={data} />
        </Grid>
      </Grid>
    </div>
  );
}
