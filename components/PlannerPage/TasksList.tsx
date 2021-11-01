import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Theme,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    stage: {
      margin: theme.spacing(2),
      border: "1px solid " + theme.palette.primary.main,
      height: "100px",
      borderRadius: 0,
    },
    stageButton: {
      height: "100%",
    },
    stageContent: {
      height: "100%",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "space-between",
    },
  })
);

const data = [
  {
    id: 1,
    name: "Etap 1",
    tasks: 10,
    doneTasks: 10,
  },
  {
    id: 2,
    name: "Etap 2",
    tasks: 10,
    doneTasks: 8,
  },
  {
    id: 3,
    name: "Etap 3",
    tasks: 15,
    doneTasks: 3,
  },
  {
    id: 4,
    name: "Etap 4",
    tasks: 10,
    doneTasks: 0,
  },
];

export default function TasksList() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography color="gray">W tym etapie nie ma żadnych zadań.</Typography>
    </div>
  );
}
