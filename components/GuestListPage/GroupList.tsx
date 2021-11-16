import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
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
import { getValue } from "../../config/helpers";
import Loading from "../Loading";
import { GuestContext } from "./GuestContext";

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
    groupTxt: { width: "10%", display: "block", flex: "none" },
    nameTxt: { width: "25%", display: "block", flex: "none" },
    surnameTxt: { width: "25%", display: "block", flex: "none" },
    invitationTxt: {
      width: "15%",
      display: "block",
      textAlign: "center",
      flex: "none",
    },
    invitationSendTxt: {
      width: "15%",
      display: "block",
      textAlign: "center",
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

    statusTxt: {
      width: "25%",
      display: "block",
      flex: "none",
    },
  })
);

export default function GroupList({
  addGroup,
  data,
  error,
}: {
  addGroup: () => void;
  data: Group[];
  error: boolean;
}) {
  console.log(data);
  const classes = useStyles();
  const [showGroup, setShowGroup] = useState<Group | undefined>();
  const [showGuest, setShowGuest] = useState<Guest | undefined>();

  const { statusOptions } = useContext(GuestContext);

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
        />
      )}
      {showGroup && (
        <GroupEdit
          open={!!showGroup}
          handleClose={() => setShowGroup(undefined)}
          group={showGroup}
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
              <Typography color="primary" className={classes.invitationSendTxt}>
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
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => setShowGroup(group)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    }
                    disablePadding
                    className={classes.groupItem}
                  >
                    <ListItemText
                      primary={group.name}
                      className={classes.groupTxt}
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
