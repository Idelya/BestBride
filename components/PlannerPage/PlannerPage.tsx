import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import Stages from "./Stages";
import request from "../../config/requests";
import useSWR from "swr";
import { PlannerContext } from "./PlannerContext";
import { Option, Phase, PhaseStat, Task, Wedding } from "../../config/types";
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
  const { data: todoOptions } = useSWR("api/todostatus", fetcher) as {
    data: Option[];
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

  useEffect(() => {
    mutateStats();
    mutatePhase();
  }, [mutateStats, mutatePhase, updated]);

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
      }}
    >
      <Container className={classes.container}>
        <Banner />
        <Stages />
      </Container>
    </PlannerContext.Provider>
  );
}
