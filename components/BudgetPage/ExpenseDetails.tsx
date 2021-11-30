import React, { useContext, useMemo } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import {
  Typography,
  Divider as Seperate,
  Theme,
  Button,
  Grid,
} from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import btnImg from "../../public/btn.png";
import { Expense } from "../../config/types";
import {
  formatDate,
  formatDateWithHour,
  getDiffInHours,
  getLocalDate,
  getValueFromExpenseCategory,
} from "../../utils/helpers";
import { ExpenseContext } from "./ExpenseContext";
import axios from "axios";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {},

    inline: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    btn: {
      display: "flex",
      justifyContent: "flex-end",
      "& *": {
        textTransform: "none",
      },
    },

    block: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface ExpenseDetails {
  expense: Expense;
  onEditClick: () => void;
  update: () => void;
}
export default function ExpenseDetails({
  expense,
  onEditClick,
  update,
}: ExpenseDetails) {
  const classes = useStyles();

  const { expenseOptions } = useContext(ExpenseContext);

  const isDeadline = useMemo(() => {
    return (
      !!expense.finalDate &&
      expense.price > expense.paid &&
      getDiffInHours(new Date(), getLocalDate(expense.finalDate)) <= 24
    );
  }, [expense.finalDate, expense.paid, expense.price]);

  const handleDelete = async () => {
    try {
      const x = await axios.delete("/api/expenseDel/" + expense.id);
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Usunieto wydatek.",
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        update();
      } else {
        store.addNotification({
          title: "Bląd",
          message: "Spróbuj ponownie później",
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid className={classes.details} container columnSpacing={15}>
      <Grid item md={6}>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Cena:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.price}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Opłacono:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.paid}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Data zapłaty:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.paymentDate &&
            new Date(expense.paymentDate).getFullYear() > 1000
              ? formatDateWithHour(getLocalDate(expense.paymentDate))
              : "Nieopłacone"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={5}>
        <div className={classes.inline}>
          <Typography
            color={isDeadline ? "error" : "GrayText"}
            variant="subtitle1"
          >
            Ostateczny termin zapłaty:
          </Typography>
          <Typography
            color={isDeadline ? "error" : "primary"}
            variant="subtitle1"
          >
            {expense.finalDate &&
            new Date(expense.finalDate).getFullYear() > 1899
              ? formatDateWithHour(getLocalDate(expense.finalDate))
              : "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Typ wydatku:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {getValueFromExpenseCategory(
              expenseOptions || [],
              expense.category
            )}
          </Typography>
        </div>
      </Grid>
      <Grid item md={12}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Uwagi:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.additionalInfo || "Brak"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={11} className={classes.btn}>
        <Button startIcon={<EditIcon />} onClick={onEditClick}>
          Edytuj
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
          Usuń
        </Button>
      </Grid>
    </Grid>
  );
}
