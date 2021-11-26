import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
import img from "../../public/img/planner.jpg";
import Heading from "../Heading";
import Task from "../Task";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    decorator: {
      backgroundColor: "#FFEFE9",
      position: "absolute",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      width: "700px",
      height: "300px",
      top: 0,
      left: 0,
      zIndex: -2,
    },
    img: {
      width: "300px",
      position: "absolute",
      top: theme.spacing(5),
      left: theme.spacing(4),
      zIndex: -1,
    },
    headingBox: {
      position: "relative",
      left: 0,
      top: theme.spacing(5),
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    container: {
      display: "flex",
      minHeight: "600px",
    },
    summary: {
      marginTop: theme.spacing(5),
      display: "flex",
      justifyContent: "center",
      textAlign: "right",
      flexDirection: "column",
    },
    bottomSpacing: {
      margin: theme.spacing(0, 2, 2),
    },
    spacing: {
      margin: theme.spacing(1, 2),
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const tasks = ["zadanie 1", "zadanie 2", "zadanie 3"];

export default function Banner() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.headingBox} md={7}>
        <Heading>Planner</Heading>
        <div className={classes.decorator} />
        <div className={classes.img}>{img && <Image alt="" src={img} />}</div>
      </Grid>
      <Grid item md={5} className={classes.summary}>
        <Typography
          component="p"
          variant="h5"
          color="sceondary"
          className={classes.spacing}
        >
          Etap 30/34
        </Typography>
        <Typography
          component="h2"
          variant="h4"
          color="primary"
          className={classes.bottomSpacing}
        >
          Sala
        </Typography>
        <Typography component="h3" variant="h4" className={classes.spacing}>
          Bieżące zadania
        </Typography>
        {tasks.map((t, i) => (
          <Task key={i}>{t}</Task>
        ))}
      </Grid>
      <Grid item md={12} className={classes.row}>
        <span className={classes.row}>
          <Typography
            component="p"
            color="GrayText"
            className={classes.spacing}
          >
            W tym etapie wykonano: 30%
          </Typography>
          <Typography
            component="p"
            color="GrayText"
            className={classes.spacing}
          >
            Wykonano 12% wszystkich zadań
          </Typography>
        </span>
        <Typography component="p" color="secondary" className={classes.spacing}>
          Opóźnienie
        </Typography>
      </Grid>
    </Grid>
  );
}
