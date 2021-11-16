import React, { useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Heading from "../Heading";
import { Theme } from "@mui/system";
import Divider from "../Divider";
import { Grid, Button, ButtonGroup } from "@mui/material";
import ExpenseSummary from "./ExpenseSummary";
import AddIcon from "@mui/icons-material/Add";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../config/types";
import ExpenseAdd from "./ExpenseAdd";
import axios from "axios";
import useSWR from "swr";
import Loading from "../Loading";
import RectangularButton from "../RectangularButton";
import { groupBy } from "lodash";
import { formatDate } from "../../config/helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    summary: {
      display: "flex",
      justifyContent: "flex-end",
    },
    btn: {
      textTransform: "none",
      "& *": {
        textTransform: "none",
      },
    },
    btnInactive: {
      color: theme.palette.grey[500],
    },
    btnInactiveWithBorder: {
      color: theme.palette.grey[500],
      borderColor: theme.palette.grey[500],
      boxShadow: "none",
    },
  })
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function Expenses() {
  const classes = useStyles();
  const [addExpense, setAddExpense] = useState(false);
  const [planned, setPlanned] = useState<boolean>(true);

  const {
    data: expenses,
    mutate,
    error: errorExpenses,
  } = useSWR("api/expenses", fetcher) as {
    data: Expense[];
    mutate: any;
    error: any;
  };

  console.log(expenses);
  /*const groupedExpenses = useMemo(() => {
    if (expenses) {
      const sorted = planned
        ? expenses.sort((a, b) => new Date(a.finalDate) - new Date(b.finalDate))
        : expenses.sort(
            (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
          );
      console.log(sorted);
      const grouped = planned
        ? groupBy((e) => formatDate(e.finalDate))
        : groupBy((e) => formatDate(e.paymentDate));

      console.log(grouped);
      return sorted;
    } else {
      return null;
    }
  }, [expenses]);*/

  if (errorExpenses)
    return (
      <div className={classes.root}>
        Nie można pobrać danych. Odśwież stronę.
      </div>
    );

  if (!expenses)
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    );

  return (
    <div className={classes.root}>
      <Divider textAlign="right">Wydatki</Divider>
      <ExpenseAdd
        open={addExpense}
        update={mutate}
        handleClose={() => setAddExpense(false)}
      />
      <Grid container>
        <Grid item md={12} className={classes.summary}>
          <ExpenseSummary />
        </Grid>
        <Grid item md={12} className={classes.btn}>
          <ButtonGroup aria-label="switch to group" sx={{ margin: " 0 10px" }}>
            <RectangularButton
              className={
                classes.btn + " " + (!planned && classes.btnInactiveWithBorder)
              }
              size="large"
              onClick={() => setPlanned(true)}
            >
              Planowane wydatki
            </RectangularButton>
            <RectangularButton
              className={
                classes.btn + " " + (planned && classes.btnInactiveWithBorder)
              }
              size="large"
              onClick={() => setPlanned(false)}
            >
              Opłacone wydatki
            </RectangularButton>
          </ButtonGroup>

          <Button startIcon={<AddIcon />} onClick={() => setAddExpense(true)}>
            Dodaj wydatek
          </Button>
        </Grid>
        <Grid item md={12}>
          <ExpensesList data={[]} />
        </Grid>
      </Grid>
    </div>
  );
}
