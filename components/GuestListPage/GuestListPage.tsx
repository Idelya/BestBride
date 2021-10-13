import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Link, TextField, Theme, Typography } from "@mui/material";
import Banner from "./Banner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
    },
  })
);

export default function ProfilPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Banner />
    </Container>
  );
}
