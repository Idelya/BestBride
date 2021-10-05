import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import { ROUTES } from "../../config/configNav";
import NavLink from "./NavLink";
import RectangularButton from "../RectangularButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
    },
  })
);

export default function Account() {
  const classes = useStyles();
  const { signUpClient, signInClient } = ROUTES;
  return (
    <Box>
      <NavLink route={signUpClient} />
      <Link href={signInClient.link} passHref>
        <RectangularButton
          color="primary"
          variant="outlined"
          size="medium"
          className={classes.root}
        >
          {signInClient.name}
        </RectangularButton>
      </Link>
    </Box>
  );
}
