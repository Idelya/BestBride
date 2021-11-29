import React from "react";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import { IconButton, Container, Theme, Typography } from "@mui/material";

const tasks = [
  {
    name: "Przymiarka sukni",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      padding: theme.spacing(3, 7),
    },
    container: {
      padding: theme.spacing(14, 0),
    },
    content: {
      border: "1px solid " + theme.palette.primary.main,
      borderRadius: "5px",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      position: "relative",
      height: "500px",
    },
    etap: {
      background: "white",
      padding: "10px",
    },
    etapContainer: {
      width: "100%",
      position: "absolute",
      top: 0,
      transform: "translateY(-50%)",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
    header: {
      margin: theme.spacing(2, 5, 4),
    },
    tasks: {
      padding: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      overflow: "auto",
      justifyContent: "space-around",
    },
  })
);

export default function TasksSection() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.spacing + " " + classes.header}
      >
        Bieżące zadania
      </Typography>
      <div className={classes.content}>
        <div className={classes.etapContainer}>
          <Typography variant="h5" color="primary" className={classes.etap}>
            Kościół
          </Typography>
        </div>
        <div className={classes.tasks}></div>
      </div>
    </Container>
  );
}
