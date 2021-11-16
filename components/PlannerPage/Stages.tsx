import React, { useRef, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Slide,
  Theme,
  Typography,
} from "@mui/material";
import TasksList from "./TasksList";
import { Phase } from "../../config/types";
import AddPhase from "./AddPhase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      transition: "all 1s ease-in-out",
    },
    stage: {
      margin: theme.spacing(2),
      borderWidth: "1px",
      border: "solid " + theme.palette.primary.light,
      height: "100px",
      borderRadius: 0,
    },
    picked: {
      backgroundColor: theme.palette.grey[200],
    },
    finished: {
      boxShadow: "none",
      borderColor: theme.palette.grey[500],
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
    tasksBox: {
      boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
      transition: "all 1s ease-in-out",
    },
    wrapper: {
      overflowX: "hidden",
      display: "flex",
      margin: theme.spacing(10, 0),
    },
    btn: {
      textAlign: "center",
      margin: theme.spacing(2, 0),
      textTransform: "none",
      width: "150px",
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

export default function Stages() {
  const classes = useStyles();
  const [currPhase, setCurrPhase] = useState<Phase | null>(null);
  const [openPhaseAdd, setOpenPhaseAdd] = useState<boolean>(false);

  const handleChange = (stage: Phase) => {
    setCurrPhase(stage === currPhase ? null : stage);
  };

  return (
    <Box className={classes.wrapper}>
      <AddPhase
        open={openPhaseAdd}
        handleClose={() => setOpenPhaseAdd(false)}
      />
      <Box
        sx={{ width: currPhase ? "30%" : "100%" }}
        className={classes.container}
      >
        <Button
          startIcon={<AddIcon />}
          className={classes.btn}
          onClick={() => setOpenPhaseAdd(true)}
        >
          Dodaj etap
        </Button>
        {data.map((stage) => (
          <Card
            className={
              classes.stage +
              " " +
              (currPhase !== stage ? "" : classes.picked) +
              " " +
              (stage.doneTasks === stage.tasks ? classes.finished : "")
            }
            key={stage.id}
          >
            <CardActionArea
              className={classes.stageButton}
              onClick={() => handleChange(stage)}
            >
              <CardContent className={classes.stageContent}>
                <Typography variant="h6" color="primary">
                  {stage.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                >{`${stage.doneTasks}/${stage.tasks}`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          visibility: currPhase ? "visible" : "hidden",
          width: currPhase ? "70%" : "0",
          position: "relative",
        }}
        className={classes.tasksBox}
      >
        <Box
          sx={{
            minWidth: "500px",
            width: "100%",
            height: "100%",
          }}
        >
          {currPhase && <TasksList phase={currPhase} />}
        </Box>
      </Box>
    </Box>
  );
}
