import React from "react";
import { styled } from "@mui/system";
import { Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Route } from "../../config/types";
import Link from "next/link";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

interface NavLinkProps {
  route: Route;
}

export default function NavLink({ route }: NavLinkProps) {
  const classes = useStyles();
  return (
    <Link href={route.link} passHref>
      <Typography component="a" className={classes.root} color="primary">
        {route.name}
      </Typography>
    </Link>
  );
}
