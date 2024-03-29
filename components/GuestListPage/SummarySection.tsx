import React, { useContext, useEffect, useMemo } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import axios from "axios";
import useSWR from "swr";
import Loading from "../Loading";
import { GuestContext } from "./GuestContext";

const names = {
  accomodation: "Z noclegiem:",
  allGuests: "Wszyscy:",
  canceled: "Odrzucone zaproszenia:",
  children: "Liczba dzieci:",
  confirmed: "Potwierdzeni:",
  invited: "Zaproszeni",
  notInvited: "Nie zaproszeni:",
  planned: "Planowani:",
  transport: "Z dojazdem:",
};

const groupConfig = {
  accomodation: {
    order: 1,
    group: 2,
  },
  allGuests: {
    order: 0,
    group: 0,
  },
  canceled: {
    order: 1,
    group: 1,
  },
  children: {
    order: 3,
    group: 2,
  },
  confirmed: {
    order: 0,
    group: 1,
  },
  invited: {
    order: 2,
    group: 0,
  },
  notInvited: {
    order: 3,
    group: 0,
  },
  planned: {
    order: 1,
    group: 0,
  },
  transport: {
    order: 0,
    group: 2,
  },
};

const groupedLabels = ["", "", ""];

const summary = [
  {
    list: [
      /*{
        name: "Wszystkie:",
        value: 253,
      },
      {
        name: "Zaproszone:",
        value: 130,
      },
      {
        name: "Bez zaproszenia:",
        value: 123,
      },*/
      {
        name: "Maksymalna liczba miejsc na sali:",
        value: 400,
      },
    ],
  },
  {
    list: [
      /*{
        name: "Potwierdzone:",
        value: 68,
      },*/
      {
        name: "Oczekujące:",
        value: 37,
      },
      /*{
        name: "Odrzucone:",
        value: 25,
      },*/
    ],
  },
  {
    list: [
      {
        name: "Z dojazdem:",
        value: 10,
      },
      {
        name: "Z noclegiem:",
        value: 10,
      },
      {
        name: "Dzieci:",
        value: 10,
      },
    ],
  },
  {
    label: "Specjalne diety:",
    list: [
      {
        name: "Bezglutenu",
        value: 10,
      },
      {
        name: "Wegetariańska:",
        value: 0,
      },
      {
        name: "Wegańska:",
        value: 10,
      },
    ],
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "70%",
    },
    listValue: {
      textAlign: "end",
    },
  })
);

interface Stats {
  accomodation: number;
  allGuests: number;
  canceled: number;
  children: number;
  confirmed: number;
  dietCount: number | null;
  invited: number;
  notInvited: number;
  planned: number;
  transport: number;
}

const group = (keys: string[], stats: Stats) => {
  const groups = groupedLabels.map((label) => {
    return {
      label: label,
      list: [],
    };
  });
  keys.forEach((key) => {
    //@ts-ignore
    groups[groupConfig[key].group].list.push({
      //@ts-ignore
      value: stats[key],
      //@ts-ignore
      name: names[key],
    });
  });
  //@ts-ignore
  groups.forEach((g) => g.list.sort((e) => e.order));
  return groups;
};
const ListGroup = (props: {
  label?: string;
  list: { name: string; value: number }[];
}) => {
  const classes = useStyles();

  return (
    <Grid item md={6}>
      {props.label && (
        <Typography variant="h6" component="h3" color="primary">
          {props.label}
        </Typography>
      )}
      <List dense className={classes.list}>
        {props.list.map((e, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  {e.name}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1" color="primary">
                  {e.value}
                </Typography>
              }
              className={classes.listValue}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function SummarySection() {
  const classes = useStyles();

  const { update } = useContext(GuestContext);
  const { data: stats, mutate: mutateStats } = useSWR(
    "api/statsGuestFull",
    fetcher
  ) as {
    data: Stats;
    mutate: any;
    error: any;
  };

  const { data: dietsStats, mutate: mutateDiets } = useSWR(
    "api/diets",
    fetcher
  ) as {
    data: {
      name: string;
      count: number;
    }[];
    mutate: () => void;
  };

  useEffect(() => {
    mutateStats();
    mutateDiets();
  }, [mutateDiets, mutateStats, update]);
  const grouped = useMemo(
    () => group(Object.keys(stats || {}), stats || {}),
    [stats]
  );

  if (!stats || !dietsStats) {
    return (
      <section>
        <Divider component="h2">Podsumowanie</Divider>
        <Loading />
      </section>
    );
  }
  return (
    <section>
      <Divider component="h2">Podsumowanie</Divider>
      <Grid container>
        {(grouped || []).map((group, i) => (
          <ListGroup key={i} list={group.list} label={group.label} />
        ))}
        <ListGroup
          key={grouped.length}
          list={dietsStats.map((diet) => {
            return {
              name: diet.name,
              value: diet.count,
            };
          })}
          label={"Diety:"}
        />
      </Grid>
    </section>
  );
}
