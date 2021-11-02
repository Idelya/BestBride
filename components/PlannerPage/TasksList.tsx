import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  List,
  Theme,
  Typography,
} from "@mui/material";
import { Phase } from "../../config/types";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
    },
    list: {
      display: "flex",
    },
    stage: {
      margin: theme.spacing(2),
      border: "1px solid " + theme.palette.primary.main,
      height: "100px",
      borderRadius: 0,
    },
    stageButton: {
      height: "100%",
    },
    stageContent: {
      height: "100%",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "space-between",
    },
    btn: {
      textAlign: "center",
      textTransform: "none",
      width: "150px",
    },
  })
);

const data = [
  {
    id: 1,
    name: "Etap 1",
    tasks: 10,
    doneTasks: 10,
  },
  {
    id: 2,
    name: "Etap 2",
    tasks: 10,
    doneTasks: 8,
  },
  {
    id: 3,
    name: "Etap 3",
    tasks: 15,
    doneTasks: 3,
  },
  {
    id: 4,
    name: "Etap 4",
    tasks: 10,
    doneTasks: 0,
  },
];

interface TasksListProps {
  phase: Phase;
}
export default function TasksList({ phase }: TasksListProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="primary">
          {phase.name}
        </Typography>
        <div>
          <Button startIcon={<AddIcon />} className={classes.btn}>
            Dodaj zadanie
          </Button>
        </div>
      </Box>
      <List className={classes.list}>
        <Typography color="gray">W tym etapie nie ma żadnych zadań.</Typography>
      </List>
    </div>
  );
}
