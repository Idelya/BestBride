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
import { useRouter } from "next/dist/client/router";
import { formatDate } from "../../config/helpers";

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
  data: {
    date: Date;
    list: Expense[];
  }[];
}
export default function ExpensesList({ data }: ExpensesListProps) {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {data.map((ele) => (
        <>
          <Typography>{formatDate(ele.date)}</Typography>
          <List>
            {ele.list.map((expense) => (
              <Accordion
                key={expense.id}
                className={classes.listItem}
                id={"expense-" + expense.id}
              >
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
                      {`${expense.paid}/${expense.price}`}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <ExpenseDetails expense={expense} />
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </>
      ))}
    </div>
  );
}
