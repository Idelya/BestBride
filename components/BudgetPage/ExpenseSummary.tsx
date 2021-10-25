import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import { Typography, Divider as Seperate, Theme, Button } from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import btnImg from "../../public/btn.png";

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

const data = [
  { name: "Liczba wydatków", value: 20 },
  { name: "Zrealizowane", value: 18 },
  { name: "Zaplanowane", value: 2 },
];

export default function ExpenseSummary() {
  const classes = useStyles();
  return (
    <div className={classes.summary}>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Liczba wydatków
        </Typography>
        <Typography variant="h5">{`${data[0].value}`}</Typography>
      </div>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Zrealizowane
        </Typography>
        <Typography
          variant="h5"
          color="primary"
        >{`${data[1].value}`}</Typography>
      </div>
      <div className={classes.inline}>
        <Typography variant="h5" color="primary">
          Zaplanowane
        </Typography>
        <Typography
          variant="h5"
          color="primary"
        >{`${data[2].value}`}</Typography>
      </div>
    </div>
  );
}
