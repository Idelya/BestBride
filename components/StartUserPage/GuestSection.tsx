import React from "react";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  IconButton,
  Container,
  Theme,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";

type GuestData = {
  name: string;
  liczba: number;
  variant: "h6" | "h5";
};

const data: GuestData[] = [
  { name: "Wszyscy", liczba: 320, variant: "h5" },
  { name: "Potwierdzone", liczba: 40, variant: "h6" },
  { name: "Zaproszone", liczba: 58, variant: "h6" },
  { name: "Oczekujące", liczba: 18, variant: "h6" },
  { name: "Dzieci", liczba: 4, variant: "h6" },
];

const COLORS = "#64150F";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      padding: theme.spacing(3, 7),
    },
    list: {
      width: "80%",
      maxWidth: "300px",
    },
    listValue: {
      textAlign: "end",
    },
    container: {
      padding: theme.spacing(14, 0),
    },
    header: {
      margin: theme.spacing(2, 5, 4),
    },
    inline: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1),
    },
    stats: {
      width: "45%",
    },
    box: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1),
    },
  })
);

export default function GuestSection() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.spacing + " " + classes.header}
      >
        Goście
      </Typography>
      <Grid container className={classes.box}>
        <Grid item xs={6}>
          <List dense className={classes.list}>
            {data.map((e, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    <Typography variant={e.variant || "h6"} color="primary">
                      {e.name}
                    </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography variant={e.variant || "h6"} color="primary">
                      {e.liczba}
                    </Typography>
                  }
                  className={classes.listValue}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item className={classes.stats} xs={6}>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liczba" fill={COLORS} />
          </BarChart>
        </Grid>
      </Grid>
    </Container>
  );
}
