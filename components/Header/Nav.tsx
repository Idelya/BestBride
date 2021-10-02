import React from "react";
import { styled } from "@mui/system";
import { Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Route } from "../../config/types";
import Link from "next/link";
import { GUEST_ROUTES_NAV } from "../../config/configNav";
import NavLink from "./NavLink";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function Nav() {
  const classes = useStyles();
  return (
    <nav>
      {GUEST_ROUTES_NAV.map((route, i) => (
        <NavLink key={i} route={route} />
      ))}
    </nav>
  );
}
