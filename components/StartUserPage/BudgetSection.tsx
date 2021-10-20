import React from "react";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import {
  IconButton,
  Container,
  Theme,
  Typography,
  Divider,
} from "@mui/material";
import { Event } from "../../config/types";
import Task from "../Task";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

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
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(3),
      height: "300px",
      width: "500px",
    },
    inline: {
      display: "flex",
      justifyContent: "space-between",
    },
    center: {
      margin: "auto",
      minWidth: "350px",
      minHeight: "300px",
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
      <div>
        <div className={classes.center}>
          <ResponsiveContainer width="100%" height="350px">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                label={() => <text>label</text>}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.summary}>
          <div className={classes.center}>
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
      </div>
    </Container>
  );
}
