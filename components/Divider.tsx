import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Theme } from "@mui/material";
import DecorationTypography from "./DecorationTypography";
import { makeStyles } from "@mui/styles";

interface LogoProps {
  children?: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline";
  textAlign?: "left" | "right" | "center";
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    minHeight: "64px",
    position: "relative",
    marginTop: theme.spacing(5),
  },
  border: {
    borderBottom: "2px solid " + theme.palette.primary.main,
    width: "100%",
  },
  content: {
    position: "absolute",
    width: "100%",
    display: "flex",
  },
  text: {
    padding: theme.spacing(0.5, 2),
    backgroundColor: "white",
    margin: theme.spacing(0, 20),
  },
  alignCenter: { justifyContent: "center" },
  alignRight: {
    justifyContent: "flex-end",
  },
}));

const Divider = ({
  children,
  variant = "h4",
  textAlign = "left",
}: LogoProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        className={
          classes.content +
          " " +
          (textAlign === "right" && classes.alignRight) +
          " " +
          (textAlign === "center" && classes.alignCenter)
        }
      >
        <Typography
          variant={variant}
          component="h1"
          color="primary"
          className={classes.text}
        >
          {children}
        </Typography>
      </div>
      <div className={classes.border} />
    </div>
  );
};

export default Divider;
