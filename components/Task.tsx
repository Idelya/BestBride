import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme, Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(2),
      padding: theme.spacing(2, 0),
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      display: "flex",
      textAlign: "center",
      justifyContent: "space-around",
      height: "100px",
      backgroundColor: "white",
    },
  })
);

interface TaskProps {
  children?: JSX.Element;
}
export function Task({ children }: TaskProps) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}
