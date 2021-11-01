import React from "react";
import { styled } from "@mui/system";
import { Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ROLE, Route } from "../../config/types";
import Link from "next/link";
import { GUEST_ROUTES_NAV, USER_ROUTES_NAV } from "../../config/configNav";
import NavLink from "./NavLink";
import { useSelector } from "react-redux";
import { OurStore } from "../../store/store";

export default function Nav() {
  const { me } = useSelector((state: OurStore) => state.authReducer);
  return (
    <nav>
      {!me &&
        GUEST_ROUTES_NAV.map((route, i) => <NavLink key={i} route={route} />)}
      {me?.role === ROLE.USER &&
        USER_ROUTES_NAV.map((route, i) => <NavLink key={i} route={route} />)}
    </nav>
  );
}
