import React from "react";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";

import {
  IconButton,
  Container,
  Theme,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import Task from "../Task";
import UnderlinedLink from "../UnderlinedLink";

const data = [
  { name: "Zapłacone", value: 10000 },
  { name: "Do zapłaty", value: 3000 },
  { name: "Budżet", value: 50000 },
  { name: "Wolne środki", value: 37000 },
];

const stats = [
  { name: "Zapłacone", value: 10000 },
  { name: "Do zapłaty", value: 3000 },
  { name: "Wolne środki", value: 37000 },
];

const COLORS = ["#64150F", "#C8291E", "#F2ABA6"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      padding: theme.spacing(3, 7),
    },
    container: {
      padding: theme.spacing(14, 0),
    },
    header: {
      margin: theme.spacing(2, 5, 4),
    },
    summary: {
      position: "absolute",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      right: 0,
      top: theme.spacing(12),
      backgroundColor: "#FFEFE9",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(0, 15),
      height: "300px",
      width: "55%",
      justifyContent: "center",
    },
    inline: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1),
    },
    stats: {
      width: "60%",
      minHeight: "300px",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      border: "1px solid " + theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1, 6),
    },
    box: {
      position: "relative",
    },
  })
);

export default function BudgetSection() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.spacing + " " + classes.header}
      >
        Budżet i wydatki
      </Typography>
      <Container className={classes.box}>
        <div className={classes.stats}>
          <PieChart width={350} height={350} data={stats}>
            <Legend />
            <Pie
              data={stats}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              labelLine
              fill="#8884d8"
              dataKey="value"
              label
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <UnderlinedLink
          route={{
            name: "Zobacz też inne statystyki twoich wydatków",
            link: "",
          }}
        />
        <div className={classes.summary}>
          <div>
            <div className={classes.inline}>
              <Typography variant="h6" color="primary">
                Zapłacone
              </Typography>
              <Typography variant="h6">{`${data[0].value} zł`}</Typography>
            </div>
            <div className={classes.inline}>
              <Typography variant="h6" color="primary">
                Do zapłaty
              </Typography>
              <Typography
                variant="h6"
                color="primary"
              >{`${data[1].value} zł`}</Typography>
            </div>
            <div className={classes.inline}>
              <Typography variant="h6" color="primary">
                Budżet
              </Typography>
              <Typography
                variant="h6"
                color="primary"
              >{`${data[2].value} zł`}</Typography>
            </div>
            <Divider color="primary" />
            <div className={classes.inline}>
              <Typography variant="h5" color="primary">
                Wolne środki
              </Typography>
              <Typography
                variant="h5"
                color="primary"
              >{`${data[3].value} zł`}</Typography>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
