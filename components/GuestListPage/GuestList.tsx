import React, { useContext, useEffect, useState } from "react";
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
import { Guest } from "../../config/types";
import useSWR from "swr";
import request from "../../config/requests";
import user from "../../pages/api/user";
import Loading from "../Loading";
import axios from "axios";
import { getValue } from "../../config/helpers";
import guest from "../../pages/api/guest";
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
    nameTxt: { width: "75%", display: "block", flex: "none" },
    statusTxt: {
      width: "25%",
      display: "block",
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
  })
);

export default function GuestList({
  addGuest,
  data,
  error,
}: {
  addGuest: () => void;
  data: Guest[] | undefined;
  error: boolean;
}) {
  const classes = useStyles();
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
      <div className={classes.main}>
        <List
          className={classes.list}
          subheader={
            <ListSubheader component="div" className={classes.subheader}>
              <Typography color="primary" className={classes.nameTxt}>
                Imię i nazwisko
              </Typography>
              <Typography color="primary" className={classes.statusTxt}>
                Status zaproszenia
              </Typography>
            </ListSubheader>
          }
        >
          {(data as Guest[]).length === 0 ? (
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
            (data as Guest[]).map((item) => {
              return (
                <ListItemButton
                  key={item.id}
                  className={classes.row}
                  onClick={() => setShowGuest(item)}
                >
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
              );
            })
          )}
        </List>

        <div className={classes.footer}>
          <IconButton aria-label="add" onClick={addGuest}>
            <AddCircleRoundedIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
