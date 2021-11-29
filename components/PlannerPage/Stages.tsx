import React, { useContext, useEffect, useRef, useState } from "react";
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
import { Guest, Phase } from "../../config/types";
import AddPhase from "./AddPhase";
import axios from "axios";
import useSWR from "swr";
import Loading from "../Loading";
import { PlannerContext } from "./PlannerContext";
import EditTask from "./EditTask";

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

export default function Stages() {
  const classes = useStyles();
  const [currPhase, setCurrPhase] = useState<Phase | null>(null);
  const [openPhaseAdd, setOpenPhaseAdd] = useState<boolean>(false);

  const handleChange = (stage: Phase) => {
    setCurrPhase(stage === currPhase ? null : stage);
  };

  const {
    statsByPhase,
    phases,
    setUpdate,
    editedTask,
    setEditedTask,
    editedPhase,
  } = useContext(PlannerContext);

  useEffect(() => {
    if (phases && currPhase) {
      setCurrPhase(phases.find((p) => p.id === currPhase.id) || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phases]);

  if (!phases)
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );

  return (
    <Box className={classes.wrapper}>
      <AddPhase
        open={openPhaseAdd}
        handleClose={() => setOpenPhaseAdd(false)}
        update={setUpdate}
      />

      {editedTask && editedPhase && (
        <EditTask
          open={!!editedTask}
          handleClose={() => setEditedTask(null)}
          update={setUpdate}
          task={editedTask}
          phase={editedPhase}
        />
      )}
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
        {(phases || []).map((stage) => {
          const stats = statsByPhase?.find(
            (stat) => stat.phaseId === stage.id
          ) || {
            done: 0,
            inProgress: 0,
            notStarted: 0,
          };
          return (
            <Card
              className={
                classes.stage +
                " " +
                (currPhase !== stage ? "" : classes.picked) +
                " " +
                (stats.notStarted === 0 && stats.inProgress === 0
                  ? classes.finished
                  : "")
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
                  <Typography variant="h6" color="primary">{`${
                    stats.done || 0
                  }/${
                    stats.done + stats.inProgress + stats.notStarted || 0
                  }`}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
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
