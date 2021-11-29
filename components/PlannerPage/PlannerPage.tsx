import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import Stages from "./Stages";
import request from "../../config/requests";
import useSWR from "swr";
import { PlannerContext } from "./PlannerContext";
import {
  IsAfterData,
  Option,
  Phase,
  PhaseStat,
  Task,
  UserPlanner,
  Wedding,
} from "../../config/types";
import axios from "axios";
import EditTask from "./EditTask";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
    },
  })
);

const fetcher = (url: string) => request.get(url).then((res) => res.data);
const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);

export default function PlannerPage() {
  const classes = useStyles();

  const [updated, setUpdated] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>();
  const [editedPhase, setEditedPhase] = useState<Phase | null>();
  const { data: todoOptions } = useSWR("api/todostatus", fetcher) as {
    data: Option[];
  };

  const { data: wedding } = useSWR("api/wedding", fetcherAuth) as {
    data: Wedding;
    mutate: any;
    error: any;
  };

  const { data: weddingUsers } = useSWR("api/usersWedding", fetcherAuth) as {
    data: UserPlanner[];
  };

  const { data: statsByPhase, mutate: mutateStats } = useSWR(
    "api/todoStatsByPhase",
    fetcherAuth
  ) as {
    data: PhaseStat[];
    mutate: () => void;
  };

  const {
    data: phases,
    mutate: mutatePhase,
    error: errorPhase,
  } = useSWR("api/phases", fetcherAuth) as {
    data: Phase[];
    mutate: any;
    error: any;
  };

  const { data: phasesIsAfter, mutate: mutatePhaseIsAfter } = useSWR(
    "api/phaseIsAfter",
    fetcherAuth
  ) as {
    data: IsAfterData[];
    mutate: any;
    error: any;
  };

  const { data: tasksIsAfter, mutate: mutateIsAfter } = useSWR(
    `api/todoIsAfter`,
    fetcherAuth
  ) as {
    data: IsAfterData[];
    mutate: any;
    error: any;
  };

  useEffect(() => {
    mutateStats();
    mutatePhase();
    mutateIsAfter();
  }, [mutateStats, mutatePhase, updated, mutateIsAfter]);

  const currentPhase = useMemo(
    () =>
      phases
        ? phases.find((p) => {
            const stats = statsByPhase?.find((s) => s.phaseId === p.id);
            if (stats) {
              return stats.inProgress !== 0 || stats.notStarted !== 0;
            }
            return false;
          })
        : undefined,
    [phases, statsByPhase]
  );

  return (
    <PlannerContext.Provider
      value={{
        todoOptions: todoOptions,
        statsByPhase: statsByPhase,
        phases: phases,
        editedTask: task,
        setEditedTask: setTask,
        update: updated,
        setUpdate: () => setUpdated(!updated),
        generalPhase: currentPhase,
        editedPhase: editedPhase,
        setEditedPhase: setEditedPhase,
        wedding: wedding,
        weddingUsers: weddingUsers,
        tasksIsAfter: tasksIsAfter,
      }}
    >
      <Container className={classes.container}>
        <Banner />
        <Stages phasesIsAfter={phasesIsAfter} />
      </Container>
    </PlannerContext.Provider>
  );
}
