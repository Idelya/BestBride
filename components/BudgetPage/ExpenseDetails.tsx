import React from "react";
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
}
export default function ExpenseDetails({ expense }: ExpenseDetails) {
  const classes = useStyles();
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
            Status:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.status}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Data zapłaty:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.paymentDate || "Nieopłacone"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Ostateczny termin zapłaty:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.finalDate || "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Szacowana cena:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.estiamtedPrice || "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Typ wydatku:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.type || "Brak"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={5}>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Link do usługi:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.service || "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Link do zadania:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.task || "Brak"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={12}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Uwagi:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {expense.remarks || "Brak"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={11} className={classes.btn}>
        <Button startIcon={<EditIcon />}>Edytuj</Button>
        <Button startIcon={<DeleteIcon />}>Usuń</Button>
      </Grid>
    </Grid>
  );
}
