import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
    },
  })
);

export default function PlannerPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Banner />
    </Container>
  );
}
