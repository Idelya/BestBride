import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { ROUTES } from "../../config/configNav";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function Account() {
  const classes = useStyles();
  const { signUpClient, signInClient } = ROUTES;
  return (
    <Box>
      <Link href={signUpClient.link} passHref>
        <Typography component="a" className={classes.root} color="primary">
          {signUpClient.name}
        </Typography>
      </Link>
      <Link href={signInClient.link} passHref>
        <Typography component="a" className={classes.root} color="primary">
          {signInClient.name}
        </Typography>
      </Link>
    </Box>
  );
}
