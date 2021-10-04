import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Button, ButtonProps, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      color: "white",
      padding: theme.spacing(1),
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="h6">Best Bride</Typography>
    </footer>
  );
};

export default Footer;
