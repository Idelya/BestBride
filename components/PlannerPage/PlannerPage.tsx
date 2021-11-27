import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import Stages from "./Stages";
import request from "../../config/requests";
import useSWR from "swr";
import { PlannerContext } from "./PlannerContext";
import { Option, Task, Wedding } from "../../config/types";
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

  const { update } = useContext(PlannerContext);

  const { data: stats, mutate: mutateStats } = useSWR(
    "api/todophaseStats",
    fetcherAuth
  ) as {
    data: any;
    mutate: () => void;
  };

  useEffect(() => {
    mutateStats();
  }, [mutateStats, update]);

  return (
    <PlannerContext.Provider
      value={{
        todoOptions: todoOptions,
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
