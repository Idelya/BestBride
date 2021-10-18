import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
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

const rows = [
  {
    name: "Wrocław",
    items: [
      {
        id: 1,
        surname: "Snow",
        name: "Jon",
        invitationAccepted: "Tak",
        invitationSend: true,
      },

      {
        id: 4,
        surname: "Stark",
        name: "Arya",
        invitationAccepted: "Nie",
        invitationSend: true,
      },
      {
        id: 5,
        surname: "Targaryen",
        name: "Daenerys",
        invitationAccepted: "Tak",
        invitationSend: true,
      },
    ],
  },
  {
    name: "Kielce",
    items: [
      {
        id: 2,
        surname: "Lannister",
        name: "Cersei",
        invitationAccepted: "?",
        invitationSend: false,
      },
      {
        id: 3,
        surname: "Lannister",
        name: "Jaime",
        invitationAccepted: "?",
        invitationSend: true,
      },
      {
        id: 6,
        surname: "Lannister",
        name: "Tyrion",
        invitationAccepted: "Tak",
        invitationSend: true,
      },
    ],
  },
  {
    name: "Winterfell",
    items: [
      {
        id: 7,
        surname: "Sansa",
        name: "Stark",
        invitationAccepted: "Tak",
        invitationSend: true,
      },
      {
        id: 8,
        surname: "Arya",
        name: "Stark",
        invitationAccepted: "?",
        invitationSend: false,
      },
      {
        id: 9,
        surname: "Robb",
        name: "Stark",
        invitationAccepted: "?",
        invitationSend: false,
      },
    ],
  },
];

export const initialGuest = {
  mail: "adres@mail.com",
  phone: "999 000 543",
  children: 0,
  witness: false,
  accommodation: false,
  groups: [],
  diets: [],
};

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
  })
);

export default function GuestList() {
  const classes = useStyles();
  const [showGuest, setShowGuest] = useState<Guest | undefined>();

  const handleClose = () => {
    setShowGuest(undefined);
  };

  return (
    <>
      <GuestInfo
        open={!!showGuest}
        handleClose={handleClose}
        guest={showGuest}
      />
      <div className={classes.main}>
        <List
          className={classes.list}
          subheader={
            <ListSubheader component="div" className={classes.subheader}>
              <Typography color="primary" className={classes.groupTxt}>
                Miasto
              </Typography>
              <Typography color="primary" className={classes.nameTxt}>
                Imię
              </Typography>
              <Typography color="primary" className={classes.surnameTxt}>
                Nazwisko
              </Typography>
              <Typography color="primary" className={classes.invitationTxt}>
                Zaakceptowano
              </Typography>
              <Typography color="primary" className={classes.invitationSendTxt}>
                Czy zaproszono
              </Typography>
            </ListSubheader>
          }
        >
          {rows.map((group) => {
            return (
              <div key={group.name}>
                <ListItem
                  key={group.name}
                  secondaryAction={
                    <IconButton edge="end" aria-label="edit">
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
                    {group.items.map((item) => (
                      <ListItemButton
                        key={item.id}
                        className={classes.row}
                        onClick={() =>
                          setShowGuest({
                            city: group.name,
                            ...item,
                            ...initialGuest,
                          })
                        }
                      >
                        <ListItemText primary="" className={classes.groupTxt} />
                        <ListItemText
                          primary={item.name}
                          className={classes.nameTxt}
                        />
                        <ListItemText
                          primary={item.surname}
                          className={classes.surnameTxt}
                        />
                        <ListItemText
                          primary={item.invitationAccepted}
                          sx={{
                            color:
                              item.invitationAccepted === "Tak"
                                ? "#15B811"
                                : item.invitationAccepted === "?"
                                ? "#4A8DF4"
                                : "#C13126;",
                          }}
                          className={classes.invitationTxt}
                        />
                        <ListItemIcon className={classes.invitationSendTxt}>
                          {item.invitationSend ? (
                            <CheckIcon color="success" />
                          ) : (
                            <CloseIcon color="error" />
                          )}
                        </ListItemIcon>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>

        <div className={classes.footer}>
          <IconButton aria-label="add">
            <AddCircleRoundedIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
