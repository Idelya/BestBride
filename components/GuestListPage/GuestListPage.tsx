import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import SummarySection from "./SummarySection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
    },
  })
);

export default function ProfilPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Banner />
      <SummarySection />
    </Container>
  );
}
