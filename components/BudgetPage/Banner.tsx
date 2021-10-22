import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function Banner() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
