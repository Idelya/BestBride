import React, { useContext } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import { Typography, Divider as Seperate, Theme, Button } from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import btnImg from "../../public/btn.png";
import { ExpenseContext } from "./ExpenseContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      width: "100%",
      maxWidth: "400px",
      marginRight: theme.spacing(10),
    },
    inline: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2),
      "& *": {
        textTransform: "none",
      },
    },
  })
);

export default function ExpenseSummary() {
  const classes = useStyles();

  const { budgetStats } = useContext(ExpenseContext);

  return (
    <div className={classes.summary}>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Liczba wydatków
        </Typography>
        <Typography variant="h5">{`${
          budgetStats?.expensesCount || 0
        }`}</Typography>
      </div>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Zrealizowane
        </Typography>
        <Typography variant="h5" color="primary">{`${
          budgetStats?.expensesRealized || 0
        }`}</Typography>
      </div>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Zaplanowane
        </Typography>
        <Typography variant="h5" color="primary">{`${
          budgetStats?.expensesPlanned || 0
        }`}</Typography>
      </div>
    </div>
  );
}
