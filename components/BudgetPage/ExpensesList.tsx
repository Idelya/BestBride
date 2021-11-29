import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import {
  Typography,
  Divider as Seperate,
  Theme,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
} from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import btnImg from "../../public/btn.png";
import { Expense } from "../../config/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpenseDetails from "./ExpenseDetails";
import { useRouter } from "next/dist/client/router";
import { formatDate, getDiffInHours, getLocalDate } from "../../utils/helpers";
import ExpenseEdit from "./ExpenseEdit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      minHeight: "100vh",
      margin: theme.spacing(5, 0),
    },
    listItem: {
      margin: theme.spacing(2, 0),
    },
    summary: {
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "& >div": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    deadlineBox: {
      boxShadow: "rgba(255, 0, 0, 0.50) 0px 0px 5px 0px inset",
    },
    details: {},
    spacing: {
      margin: theme.spacing(0, 2),
    },
    box: {
      width: "250px",
      display: "flex",
    },
  })
);

interface ExpensesListProps {
  data: {
    date: string;
    list: Expense[];
  }[];
  update: () => void;
}

export default function ExpensesList({ data, update }: ExpensesListProps) {
  const classes = useStyles();
  const [expense, setExpense] = useState<Expense | null>();

  if (data.length === 0) {
    return (
      <div className={classes.list}>
        <Typography>Nie ma tutaj jeszcze żadnych wydatków</Typography>
      </div>
    );
  }
  return (
    <div className={classes.list}>
      {expense && (
        <ExpenseEdit
          open={!!expense}
          handleClose={() => setExpense(null)}
          expense={expense}
          update={update}
        />
      )}
      {data.map((ele) => (
        <>
          <Typography variant="h5" color="secondary">
            {ele.date}
          </Typography>
          <List>
            {ele.list.map((expense) => {
              const isdeadline =
                !!expense.finalDate &&
                expense.price > expense.paid &&
                getDiffInHours(new Date(), getLocalDate(expense.finalDate)) <=
                  24;
              return (
                <Accordion
                  key={expense.id}
                  className={classes.listItem}
                  id={"expense-" + expense.id}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={
                      classes.summary +
                      " " +
                      (isdeadline ? classes.deadlineBox : "")
                    }
                  >
                    <Typography color="primary" variant="h6">
                      {expense.name}
                    </Typography>
                    <div className={classes.box}>
                      <Typography
                        color="primary"
                        variant="subtitle1"
                        className={classes.spacing}
                      >
                        {`${expense.paid}/${expense.price}`}
                      </Typography>
                      {isdeadline && <Typography color="error">!</Typography>}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <ExpenseDetails
                      expense={expense}
                      onEditClick={() => setExpense(expense)}
                      update={update}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </List>
        </>
      ))}
    </div>
  );
}
