import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Grid, Modal, Theme, Typography } from "@mui/material";
import img from "../../public/img/planner.jpg";
import Heading from "../Heading";
import { Task as TaskComponent } from "../Task";
import axios from "axios";
import useSWR from "swr";
import { PlannerContext } from "./PlannerContext";
import { sortBy } from "lodash";
import { Phase, Task } from "../../config/types";
import Loading from "../Loading";
import { getValue } from "../../utils/helpers";
import TaskDetails from "../TaskDetails";
import Divider from "../Divider";
import FullLoading from "../FullLoading";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      width: "80vw",
      backgroundColor: theme.palette.background.default,
      border: "solid thin " + theme.palette.primary.main,
      margin: "auto",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -30%)",
      padding: theme.spacing(0, 5, 5),
      borderRadius: theme.spacing(5),
    },
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

const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);
const CuerrentTasks = ({ phase }: { phase: Phase }) => {
  const classes = useStyles();
  const [currTask, setCurrTask] = useState<Task | null>();
  const {
    update,
    todoOptions,
    setUpdate,
    setEditedTask,
    setEditedPhase,
    generalPhase,
  } = useContext(PlannerContext);
  const { data: tasks, mutate } = useSWR(
    `api/task/${phase.id}`,
    fetcherAuth
  ) as {
    data: Task[];
    mutate: any;
    error: any;
  };

  useEffect(() => {
    mutate();
  }, [mutate, update]);
  if (!tasks || !todoOptions) {
    return <Loading />;
  }
  return (
    <>
      {currTask && (
        <Modal open={!!currTask} onClose={() => setCurrTask(null)}>
          <Box className={classes.modal}>
            <Divider>{currTask.name}</Divider>
            <TaskDetails
              task={currTask}
              update={setUpdate}
              onEditClick={() => {
                setCurrTask(null);
                setEditedPhase(generalPhase);
                setEditedTask(currTask);
              }}
            />
          </Box>
        </Modal>
      )}
      <Typography component="h3" variant="h4" className={classes.spacing}>
        Bieżące zadania
      </Typography>
      {(sortBy(tasks || [], ["date", "status"]) || [])
        .filter((t) => t.status != 2)
        .filter((_, i) => i < 3)
        .map((task, i) => (
          <TaskComponent key={i}>
            <Box
              sx={{
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setCurrTask(task)}
            >
              <Typography color="primary" variant="h6">
                {task.name}
              </Typography>
              <Box>
                <Typography color="primary" variant="subtitle1">
                  {getValue(todoOptions || [], task.status)}
                </Typography>
              </Box>
            </Box>
          </TaskComponent>
        ))}
    </>
  );
};

export default function Banner() {
  const classes = useStyles();

  const { data: statsGeneral, mutate: mutateStats } = useSWR(
    "api/phaseStatsGeneral",
    fetcherAuth
  ) as {
    data: any;
    mutate: () => void;
  };
  console.log(statsGeneral);
  const { update, phases, statsByPhase, generalPhase } =
    useContext(PlannerContext);

  const currentPhaseStats = useMemo(
    () => statsByPhase?.find((s) => s.phaseId === generalPhase?.id),
    [generalPhase, statsByPhase]
  );

  useEffect(() => {
    mutateStats();
  }, [mutateStats, update]);

  if (!phases) {
    return null;
  }
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.headingBox} md={7}>
        <Heading>Planner</Heading>
        <div className={classes.decorator} />
        <div className={classes.img}>{img && <Image alt="" src={img} />}</div>
      </Grid>
      <Grid item md={5} className={classes.summary} sx={{ minHeight: "70vh" }}>
        <Typography
          component="p"
          variant="h5"
          color="sceondary"
          className={classes.spacing}
        >
          {`Etap ${
            phases.findIndex((p) => p.id === generalPhase?.id) + 1 ||
            phases.length
          }/${phases.length}`}
        </Typography>
        <Typography
          component="h2"
          variant="h4"
          color="primary"
          className={classes.bottomSpacing}
        >
          {generalPhase?.name || "Nie posiadasz żadnego rozpoczętego etapu."}
        </Typography>
        {generalPhase && <CuerrentTasks phase={generalPhase} />}
      </Grid>
      <Grid item md={12} className={classes.row}>
        <span className={classes.row}>
          <Typography
            component="p"
            color="GrayText"
            className={classes.spacing}
          >
            {currentPhaseStats
              ? `W tym etapie wykonano: ${
                  (currentPhaseStats.done * 100) /
                  (currentPhaseStats.done +
                    currentPhaseStats.inProgress +
                    currentPhaseStats.notStarted)
                }%`
              : "Brak statystyk z bierzącego etapu"}
          </Typography>
          <Typography
            component="p"
            color="GrayText"
            className={classes.spacing}
          >
            {statsGeneral
              ? `Wykonano ${(
                  (statsGeneral.done * 100) /
                  (statsGeneral.done +
                    statsGeneral.inProgress +
                    statsGeneral.notStarted)
                ).toFixed(0)}% wszystkich zadań`
              : "Brak statystyk z wszystkich zadań"}
          </Typography>
        </span>
        {/*<Typography component="p" color="secondary" className={classes.spacing}>
          Opóźnienie
                  </Typography>*/}
      </Grid>
    </Grid>
  );
}
