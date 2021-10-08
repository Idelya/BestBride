import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Button, ButtonProps, Theme } from "@mui/material";
import DecorationTypography from "./DecorationTypography";
import { createStyles, makeStyles, withThemeCreator } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      borderRadius: 0,
      backgroundColor: "rgba(255, 255, 255, 0.70)",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: "rgba(255, 255, 255, 0.70)",
      },
    },
  })
);

const RectangularButton = ({ className, ...props }: ButtonProps) => {
  const classes = useStyles();
  return <Button className={classes.button + " " + className} {...props} />;
};

export default RectangularButton;
