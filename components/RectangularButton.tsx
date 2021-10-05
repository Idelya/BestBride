import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Button, ButtonProps } from "@mui/material";
import DecorationTypography from "./DecorationTypography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  companies: {
    marginTop: "-0.5rem",
    textAlign: "center",
  },
});

const RectangularButton = (props: ButtonProps) => {
  const classes = useStyles();
  return <Button {...props} />;
};

export default RectangularButton;
