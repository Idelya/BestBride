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
    },
    details: {},
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
              <Typography>{expense.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </div>
  );
}
