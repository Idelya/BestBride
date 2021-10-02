import { AppBar, styled, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { GUEST_ROUTES_NAV } from "../../config/configNav";
import Logo from "../Logo";
import Account from "./Account";
import NavLink from "./NavLink";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    opacity: 0.87,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar elevation={0} position="fixed" className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Logo />
        <nav>
          {GUEST_ROUTES_NAV.map((route, i) => (
            <NavLink key={i} route={route} />
          ))}
        </nav>
        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
