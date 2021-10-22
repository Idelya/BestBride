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
    justifyContent: "center",
    padding: theme.spacing(4, 10),
    border: "1px solid " + theme.palette.primary.main,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    width: "max-content",
    backgroundColor: "white",
  },
  text: {},
}));

const Heading = ({ children, variant = "h3" }: LogoProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography
        variant={variant}
        component="h1"
        color="primary"
        className={classes.text}
      >
        {children}
      </Typography>
    </div>
  );
};

export default Heading;
