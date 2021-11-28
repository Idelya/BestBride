import React, { createContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Container, Theme } from "@mui/material";
import Banner from "./Banner";
import SummarySection from "./SummarySection";
import GuestSection from "./GuestSection";
import request from "../../config/requests";
import useSWR from "swr";
import { Diet, Option } from "../../config/types";
import { GuestContext } from "./GuestContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
    },
  })
);

const fetcher = (url: string) => request.get(url).then((res) => res.data);

export default function ProfilPage() {
  const classes = useStyles();
  const [updated, setUpdated] = useState(false);

  const { data: dietsOptions } = useSWR("api/diet", fetcher) as {
    data: Diet[];
  };
  const { data: genderOptions } = useSWR("api/gender", fetcher) as {
    data: Option[];
  };

  const { data: statusOptions } = useSWR("api/guestStatus", fetcher) as {
    data: Option[];
  };

  return (
    <GuestContext.Provider
      value={{
        dietsOptions: dietsOptions,
        genderOptions: genderOptions,
        statusOptions: statusOptions,
        update: updated,
        setUpdate: () => setUpdated(!updated),
      }}
    >
      <Container className={classes.container}>
        <Banner />
        <SummarySection />
        <GuestSection />
      </Container>
    </GuestContext.Provider>
  );
}
