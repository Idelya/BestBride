import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import { Task } from "../config/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },

    block: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface TaskProps {
  task: Task;
}
export default function TaskDetails({ task }: TaskProps) {
  const classes = useStyles();
  return (
    <Grid container columnSpacing={15}>
      <Grid item md={6}>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Status:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {task.status}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Termin:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {task.date || "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Przypisano:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {task.assignedTo || "Brak"}
          </Typography>
        </div>
      </Grid>

      <Grid item md={5}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Link do wydatku:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            <List>
              {task.expanses
                ? task.expanses.map((exp, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={exp.name} />
                    </ListItem>
                  ))
                : "Brak"}
            </List>
          </Typography>
        </div>
      </Grid>

      <Grid item md={12}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Uwagi:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {task.remarks || "Brak"}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
