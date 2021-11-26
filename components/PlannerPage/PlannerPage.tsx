import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import Stages from "./Stages";
import request from "../../config/requests";
import useSWR from "swr";
import { PlannerContext } from "./PlannerContext";
import { Option, Wedding } from "../../config/types";
import axios from "axios";

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

  const { data: todoOptions } = useSWR("api/todostatus", fetcher) as {
    data: Option[];
  };

  const { data: stats } = useSWR("api/todophaseStats", fetcherAuth) as {
    data: any;
  };

  return (
    <PlannerContext.Provider
      value={{
        todoOptions: todoOptions,
      }}
    >
      <Container className={classes.container}>
        <Banner />
        <Stages />
      </Container>
    </PlannerContext.Provider>
  );
}
