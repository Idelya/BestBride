import React, { useContext, useEffect, useState } from "react";
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
  Modal,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { Phase, Task } from "../../config/types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RectangularButton from "../RectangularButton";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import DraggableTask from "./DraggableTask";
import { orderBy } from "lodash";
import AddTask from "./AddTask";
import useSWR from "swr";
import Loading from "../Loading";
import axios from "axios";
import { PlannerContext } from "./PlannerContext";
import EditTask from "./EditTask";
import { store } from "react-notifications-component";
import EditPhase from "./EditPhase";

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
    modal: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "60vw",
      backgroundColor: theme.palette.background.default,
      border: "solid thin " + theme.palette.primary.main,
      margin: "auto",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -30%)",
      padding: theme.spacing(5, 10),
      borderRadius: theme.spacing(5),
    },
  })
);

interface TasksListProps {
  phase: Phase;
}

const reorder = (
  list: Iterable<Task> | ArrayLike<Task>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function TasksList({ phase }: TasksListProps) {
  const classes = useStyles();
  const [filtrList, setFiltrList] = useState<number>(1);
  const [openTaskAdd, setOpenTaskAdd] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [editPhase, setEditPhase] = useState<boolean>(false);

  const { todoOptions, update, setUpdate } = useContext(PlannerContext);
  const {
    data: tasks,
    mutate,
    error: errorTask,
  } = useSWR(`api/task/${phase.id}`, fetcher) as {
    data: Task[];
    mutate: any;
    error: any;
  };
  console.log(tasks);
  useEffect(() => {
    mutate();
  }, [mutate, update]);

  const [localItems, setLocalItems] = useState<Array<Task>>(tasks || []);

  const handleDelete = async () => {
    try {
      const x = await axios.delete("/api/phaseDel/" + phase.id);
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Usunieto etap.",
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
        setUpdate();
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
  const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setLocalItems((_) => {
      if (!result.destination) {
        return tasks;
      }

      const items = reorder(
        localItems,
        result.source.index,
        result.destination.index
      );
      return items;
    });
  };

  if (errorTask)
    return (
      <Box
        sx={{
          display: "flex",
          margin: "32px",
        }}
      >
        Nie można pobrać danych. Odśwież stronę.
      </Box>
    );
  if (!tasks || !todoOptions)
    return (
      <Box
        sx={{
          display: "flex",
          margin: "32px",
        }}
      >
        <Loading />
      </Box>
    );

  return (
    <div className={classes.container}>
      {editPhase && (
        <EditPhase
          open={editPhase}
          handleClose={() => setEditPhase(false)}
          update={setUpdate}
          phase={phase}
        />
      )}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <Box className={classes.modal}>
          <Typography>
            Czy na pewno chcesz usunąć etap? Zostanie usunięty wraz ze
            wszystkimi zadaniami.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "32px",
            }}
          >
            <Button onClick={handleDelete} className={classes.btn}>
              Usuń
            </Button>
            <Button
              onClick={() => setConfirmDelete(false)}
              className={classes.btn}
            >
              Anuluj
            </Button>
          </Box>
        </Box>
      </Modal>
      <AddTask
        open={openTaskAdd}
        handleClose={() => setOpenTaskAdd(false)}
        update={setUpdate}
        phase={phase}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4" color="primary" sx={{ marginRight: "8px" }}>
            {phase.name}
          </Typography>
          <Tooltip title="Edytuj etap" color="primary">
            <IconButton onClick={() => setEditPhase(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Usuń etap" color="primary">
            <IconButton onClick={() => setConfirmDelete(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <div>
          <Button
            startIcon={<AddIcon />}
            className={classes.btn}
            onClick={() => setOpenTaskAdd(true)}
          >
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
          {todoOptions.map((elem) => (
            <RectangularButton
              key={elem.key}
              className={
                classes.btn +
                " " +
                (elem.key != filtrList && classes.btnInactiveWithBorder)
              }
              size="large"
              onClick={() => setFiltrList(elem.key)}
            >
              {elem.value}
            </RectangularButton>
          ))}
        </ButtonGroup>
      </Box>
      <List>
        {!tasks && (
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
                {tasks
                  .filter((todo) => todo.status === filtrList)
                  .sort()
                  .map((task, index) => (
                    <DraggableTask
                      key={task.order}
                      task={task}
                      index={index}
                      phase={phase}
                    />
                  ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </div>
  );
}
