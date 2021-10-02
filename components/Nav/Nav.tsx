import { AppBar, styled, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Logo from "../Logo";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    opacity: 0.87,
  },
});

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar elevation={0} position="fixed" className={classes.root}>
      <Toolbar variant="dense">
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
