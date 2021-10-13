import React from "react";
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

const summary = [
  {
    list: [
      {
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
      },
      {
        name: "Maksymalna liczba miejsc na sali:",
        value: 400,
      },
    ],
  },
  {
    list: [
      {
        name: "Potwierdzone:",
        value: 68,
      },
      {
        name: "Oczekujące:",
        value: 37,
      },
      {
        name: "Odrzucone:",
        value: 25,
      },
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

export default function SummarySection() {
  const classes = useStyles();
  return (
    <section>
      <Divider component="h2">Podsumowanie</Divider>
      <Grid container>
        {summary.map((group, i) => (
          <ListGroup key={i} list={group.list} label={group.label} />
        ))}
      </Grid>
    </section>
  );
}
