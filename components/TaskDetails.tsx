import React, { useContext } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task, UserPlanner } from "../config/types";
import { formatDate, formatDateWithHour, getValue } from "../utils/helpers";
import { PlannerContext } from "./PlannerPage/PlannerContext";
import axios from "axios";
import { update } from "lodash";
import { store } from "react-notifications-component";

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
    btn: {
      display: "flex",
      justifyContent: "flex-end",
      "& *": {
        textTransform: "none",
      },
    },
  })
);

interface TaskProps {
  task: Task;
  onEditClick?: () => void;
  update: () => void;
  users?: UserPlanner[];
  isAfter?: boolean;
}
export default function TaskDetails({
  task,
  onEditClick,
  update,
  users = [],
  isAfter = false,
}: TaskProps) {
  const classes = useStyles();

  const { todoOptions } = useContext(PlannerContext);

  const handleDelete = async () => {
    try {
      const x = await axios.delete("/api/taskDel/" + task.id);
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Usunieto wydatek.",
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        update();
      } else {
        store.addNotification({
          title: "Bląd",
          message: "Spróbuj ponownie później",
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid container columnSpacing={15}>
      <Grid item md={12}>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Status:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {getValue(todoOptions || [], task.status)}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography
            color={isAfter ? "error" : "GrayText"}
            variant="subtitle1"
          >
            Termin:
          </Typography>
          <Typography color={isAfter ? "error" : "primary"} variant="subtitle1">
            {task.date ? formatDateWithHour(new Date(task.date)) : "Brak"}
          </Typography>
        </div>
        <div className={classes.inline}>
          <Typography color="GrayText" variant="subtitle1">
            Przypisano:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {users.find((u) => u.id === task.assigned)?.name ||
              users.find((u) => u.id === task.assigned)?.email ||
              "Brak"}
          </Typography>
        </div>
      </Grid>
      {/*
      <Grid item md={5}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Wydatki:
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
                */}
      <Grid item md={12}>
        <div className={classes.block}>
          <Typography color="GrayText" variant="subtitle1">
            Uwagi:
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {task.additionalInfo || "Brak"}
          </Typography>
        </div>
      </Grid>
      <Grid item md={11} className={classes.btn}>
        <Button startIcon={<EditIcon />} onClick={onEditClick}>
          Edytuj
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
          Usuń
        </Button>
      </Grid>
    </Grid>
  );
}
