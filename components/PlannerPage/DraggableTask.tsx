import React, { useContext, useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  List,
  Theme,
  Typography,
} from "@mui/material";
import { Phase, Task } from "../../config/types";
import AddIcon from "@mui/icons-material/Add";
import RectangularButton from "../RectangularButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "../TaskDetails";
import { getValue } from "../../utils/helpers";
import { PlannerContext } from "./PlannerContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
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
    recBtn: {
      textTransform: "none",
    },
    btnInactive: {
      color: theme.palette.grey[500],
    },
    btnInactiveWithBorder: {
      color: theme.palette.grey[500],
      borderColor: theme.palette.grey[500],
      boxShadow: "none",
    },
    list: {
      width: "100%",
    },
    listItem: {
      margin: theme.spacing(2, 0),
    },
    summary: {
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "& div": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    spacing: {
      margin: theme.spacing(0, 2),
    },
    box: {
      width: "250px",
    },
    isAfter: {
      boxShadow: "rgba(255, 0, 0, 0.50) 0px 0px 5px 0px inset",
    },
  })
);

interface DraggableTaskProps {
  task: Task;
  index: number;
  phase: Phase;
}

export default function DraggableTask({
  task,
  index,
  phase,
}: DraggableTaskProps) {
  const classes = useStyles();

  const {
    todoOptions,
    setEditedTask,
    setEditedPhase,
    setUpdate,
    weddingUsers,
    tasksIsAfter,
  } = useContext(PlannerContext);

  const isAfter = useMemo(() => {
    const isAfterTaskData = tasksIsAfter.find((elem) => elem.id === task.id);
    return isAfterTaskData ? isAfterTaskData.isAfter : false;
  }, [task, tasksIsAfter]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <Accordion
            key={task.id}
            className={classes.listItem}
            id={"task-" + task.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={
                classes.summary + " " + (isAfter ? classes.isAfter : "")
              }
            >
              <Box sx={{ display: "inline" }}>
                <Typography color="primary" variant="h6">
                  {task.name}
                </Typography>
                {isAfter && (
                  <Typography color="error" sx={{ marginLeft: "8px" }}>
                    !
                  </Typography>
                )}
              </Box>
              <div className={classes.box}>
                <Typography
                  color="primary"
                  variant="subtitle1"
                  className={classes.spacing}
                >
                  {getValue(todoOptions || [], task.status)}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <TaskDetails
                isAfter={isAfter}
                task={task}
                onEditClick={() => {
                  setEditedTask(task);
                  setEditedPhase(phase);
                }}
                update={setUpdate}
                users={weddingUsers}
              />
            </AccordionDetails>
          </Accordion>
        );
      }}
    </Draggable>
  );
}
