import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { GUEST_ROUTES_NAV } from "../../config/configNav";
import Logo from "../Logo";
import Account from "./Account";
import Nav from "./Nav";
import NavLink from "./NavLink";
import ReactNotification from "react-notifications-component";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    opacity: 0.87,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  marginNotification: {
    margin: "32px",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar
      elevation={0}
      position="fixed"
      className={classes.root}
      color="inherit"
    >
      <ReactNotification className={classes.marginNotification} />
      <Toolbar variant="dense" className={classes.toolbar}>
        <Link href="/" passHref>
          <Typography sx={{ cursor: "pointer" }}>
            <Logo />
          </Typography>
        </Link>
        <Nav />
        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
