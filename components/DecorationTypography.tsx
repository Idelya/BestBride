import React from "react";
import { styled } from "@mui/system";
import { Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: "Lucida Calligraphy",
    textAlign: "center",
  },
});

export default function DecorationTypography({
  className,
  ...props
}: TypographyProps) {
  const classes = useStyles();
  return (
    <Typography
      component="span"
      {...props}
      className={classes.root + " " + className}
    />
  );
}
