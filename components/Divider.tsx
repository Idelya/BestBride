import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Theme } from "@mui/material";
import DecorationTypography from "./DecorationTypography";
import { makeStyles } from "@mui/styles";

interface DividerProps {
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
  component?: "h1" | "h2" | "p";
  secondary?: string;
  textMargin?: string;
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
    position: "relative",
  },
  spacing: {
    margin: theme.spacing(0, 20),
  },
  alignCenter: { justifyContent: "center" },
  alignRight: {
    justifyContent: "flex-end",
  },
  secondary: {
    position: "absolute",
    textAlign: "center",
    marginLeft: theme.spacing(-2),
    width: "100%",
    transform: "translateY(-100%)",
  },
}));

const Divider = ({
  children,
  variant = "h4",
  textAlign = "left",
  component = "h1",
  secondary,
  textMargin,
}: DividerProps) => {
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
          color="primary"
          className={classes.text + " " + (!textMargin && classes.spacing)}
          component={component}
          sx={textMargin ? { margin: "0 " + textMargin } : undefined}
        >
          {secondary && (
            <Typography color="gray" className={classes.secondary}>
              {secondary}
            </Typography>
          )}
          {children}
        </Typography>
      </div>
      <div className={classes.border} />
    </div>
  );
};

export default Divider;
