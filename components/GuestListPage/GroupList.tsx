import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Box,
  Collapse,
  IconButton,
  ListItemButton,
  Theme,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GuestInfo from "./GuestInfo";
import { Group, Guest } from "../../config/types";
import GroupEdit from "./GroupEdit";
import { getValue } from "../../utils/helpers";
import Loading from "../Loading";
import { GuestContext } from "./GuestContext";
import { store } from "react-notifications-component";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      border: "solid thin " + theme.palette.primary.main,
      margin: theme.spacing(2),
      borderRadius: "5px",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      overflow: "auto",
    },
    list: {
      height: 600,
      overflow: "auto",
      //scroll
      "& .scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "10px",
        backgroundColor: " #F5F5F5",
      },

      "&::-webkit-scrollbar": {
        width: "12px",
        backgroundColor: "#F5F5F5",
      },

      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: theme.palette.primary.main,
      },
    },
    groupItem: {
      backgroundColor: "#FFEFE9",
      boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
      padding: theme.spacing(1),
    },
    groupTxt: { width: "15%", display: "block", flex: "none" },
    nameTxt: { width: "45%", display: "block", flex: "none" },
    statusTxt: {
      width: "30%",
      display: "block",
      textAlign: "right",
      flex: "none",
    },
    subheader: {
      display: "flex",
      padding: theme.spacing(1),
    },
    row: {
      display: "flex",
      padding: theme.spacing(1),
      border: "solid thin #e8e8e8",
    },
    footer: {
      display: "flex",
      padding: theme.spacing(1),
      justifyContent: "center",
    },
    spacing: {
      marginLeft: theme.spacing(3),
    },
  })
);

export default function GroupList({
  addGroup,
  data,
  error,
  updateGuest,
  updateGroups,
  allGuests,
}: {
  addGroup: () => void;
  data: Group[];
  error: boolean;
  updateGuest: () => void;
  updateGroups: () => void;
  allGuests: Guest[];
}) {
  const classes = useStyles();
  const [showGroup, setShowGroup] = useState<Group | undefined>();
  const [showGuest, setShowGuest] = useState<Guest | undefined>();

  const { statusOptions } = useContext(GuestContext);
  const handleDeleteGroup = async (id: number) => {
    try {
      const x = await axios.delete("/api/groupDel/" + id);
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Usunieto grupę.",
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
        updateGroups();
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
  if (error)
    return (
      <div className={classes.main}>
        Nie można pobrać danych. Odśwież stronę.
      </div>
    );

  if (!data)
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Loading />
      </Box>
    );

  return (
    <>
      {showGuest && (
        <GuestInfo
          open={!!showGuest}
          handleClose={() => setShowGuest(undefined)}
          guest={showGuest}
          update={updateGuest}
        />
      )}
      {showGroup && (
        <GroupEdit
          open={!!showGroup}
          handleClose={() => {
            setShowGroup(undefined);
            updateGuest();
            updateGroups();
          }}
          group={showGroup}
          guests={allGuests}
        />
      )}
      <div className={classes.main}>
        <List
          className={classes.list}
          subheader={
            <ListSubheader component="div" className={classes.subheader}>
              <Typography color="primary" className={classes.groupTxt}>
                Grupa
              </Typography>
              <Typography color="primary" className={classes.nameTxt}>
                Imię
              </Typography>
              <Typography color="primary" className={classes.statusTxt}>
                Status zaproszenia
              </Typography>
            </ListSubheader>
          }
        >
          {(data as Group[]).length === 0 ? (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography sx={{ margin: "32px auto" }}>
                Lista gości jest pusta.
              </Typography>
            </Box>
          ) : (
            (data as Group[]).map((group) => {
              return (
                <div key={group.name}>
                  <ListItem
                    key={group.name}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => setShowGroup(group)}
                          className={classes.spacing}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            group.id && handleDeleteGroup(group.id)
                          }
                          className={classes.spacing}
                        >
                          <DeleteIcon color="primary" />
                        </IconButton>
                      </Box>
                    }
                    disablePadding
                    className={classes.groupItem}
                  >
                    <ListItemText
                      primary={group.name}
                      className={classes.nameTxt}
                    />
                  </ListItem>
                  <Collapse in={true} timeout="auto">
                    <List component="div" disablePadding>
                      {group.guests.map((item) => (
                        <ListItemButton
                          key={item.id}
                          className={classes.row}
                          onClick={() => setShowGuest(item)}
                        >
                          <ListItemText
                            primary=""
                            className={classes.groupTxt}
                          />
                          <ListItemText
                            primary={item.name}
                            className={classes.nameTxt}
                          />
                          <ListItemText
                            primary={getValue(statusOptions || [], item.status)}
                            sx={{
                              color:
                                item.status === 1
                                  ? "#64150F"
                                  : item.status === 2
                                  ? "#15B811"
                                  : item.status != 3
                                  ? "#888888"
                                  : "#C13126;",
                            }}
                            className={classes.statusTxt}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            })
          )}
        </List>

        <div className={classes.footer}>
          <IconButton aria-label="add" onClick={addGroup}>
            <AddCircleRoundedIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
