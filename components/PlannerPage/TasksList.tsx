import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
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
import { Phase, Task, TASK_STATUS } from "../../config/types";
import AddIcon from "@mui/icons-material/Add";
import RectangularButton from "../RectangularButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "../TaskDetails";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import DraggableTask from "./DraggableTask";

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
  })
);

const data = [
  {
    id: 1,
    name: "Zadanie 1",
    status: TASK_STATUS.BACKLOG,
  },
  {
    id: 2,
    name: "Etap 2",
    status: TASK_STATUS.BACKLOG,
  },
  {
    id: 3,
    name: "Etap 3",
    status: TASK_STATUS.BACKLOG,
  },
  {
    id: 4,
    name: "Etap 4",
    status: TASK_STATUS.BACKLOG,
  },
];

interface TasksListProps {
  phase: Phase;
}

export default function TasksList({ phase }: TasksListProps) {
  const classes = useStyles();
  const [filtrList, setFiltrList] = useState<"all" | "undone" | "done">("all");
  const [localItems, setLocalItems] = useState<Array<Task>>(data);

  // normally one would commit/save any order changes via an api call here...
  const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setLocalItems((prev: any) => {
      const temp = [...prev];
      const d = temp[result.destination!.index];
      temp[result.destination!.index] = temp[result.source.index];
      temp[result.source.index] = d;

      return temp;
    });
  };

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          margin: "12px",
        }}
      >
        <ButtonGroup
          aria-label="switch to my list"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RectangularButton
            className={
              classes.btn +
              " " +
              ("all" != filtrList && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setFiltrList("all")}
          >
            Wszystkie
          </RectangularButton>
          <RectangularButton
            className={
              classes.btn +
              " " +
              ("undone" != filtrList && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setFiltrList("undone")}
          >
            Niezrobione
          </RectangularButton>
          <RectangularButton
            className={
              classes.btn +
              " " +
              ("done" != filtrList && classes.btnInactiveWithBorder)
            }
            size="large"
            onClick={() => setFiltrList("done")}
          >
            Zrobione
          </RectangularButton>
        </ButtonGroup>
      </Box>
      <List>
        {!data && (
          <Typography color="gray">
            W tym etapie nie ma żadnych zadań.
          </Typography>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(droppableProvided: DroppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {data.map((task, index) => (
                  <DraggableTask key={index} task={task} index={index} />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </div>
  );
}
