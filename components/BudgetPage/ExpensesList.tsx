import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
    },
    listItem: {
      margin: theme.spacing(2, 0),
    },
    summary: {
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "& div": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    details: {},
    spacing: {
      margin: theme.spacing(0, 2),
    },
    box: {
      width: "250px",
    },
  })
);

interface ExpensesListProps {
  expenses: Expense[];
}
export default function ExpensesList({ expenses }: ExpensesListProps) {
  const classes = useStyles();
  return (
    <div className={classes.list}>
      <List>
        {expenses.map((expense) => (
          <Accordion key={expense.id} className={classes.listItem}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.summary}
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
                  {expense.status}
                </Typography>
                <Typography
                  color="primary"
                  variant="subtitle1"
                  className={classes.spacing}
                >
                  {`${expense.status === "opłacone" ? expense.price : 0}/${
                    expense.price
                  }`}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <ExpenseDetails expense={expense} />
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </div>
  );
}
