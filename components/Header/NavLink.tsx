import React from "react";
import { styled, Theme } from "@mui/system";
import { Typography, TypographyProps } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Route } from "../../config/types";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      textDecoration: "none",
      padding: theme.spacing(1),
      position: "relative",
      "&::before": {
        content: "''",
        position: "absolute",
        display: "block",
        width: "100%",
        height: "1px",
        bottom: 0,
        left: 0,
        backgroundColor: "#64150F",
        transform: "scaleX(0)",
        transformOrigin: "top left",
        transition: "transform 0.4s ease",
      },
      "&:hover::before": {
        transform: "scaleX(1)",
      },
    },
  })
);

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
