import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Heading from "../Heading";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      width: "100%",
      height: "35vh",
      paddingTop: theme.spacing(8),
      display: "flex",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, #FFEFE9 10%, rgba(255,255,255,0) 100%);",
    },
  })
);

export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Heading>Budżet i wydatki</Heading>
    </div>
  );
}
