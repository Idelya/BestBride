import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
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

const header = [
  { headerName: "Miasto" },
  { headerName: "Imię" },
  { headerName: "Nazwisko" },
  { headerName: "Zaakceptowano" },
  {
    headerName: "Czy zaproszono",
  },
];

const rows = [
  {
    name: "Wrocław",
    items: [
      {
        id: 1,
        group: "Wrocław",
        surname: "Snow",
        name: "Jon",
        invitationAccepted: "Tak",
        invitationSend: true,
      },

      {
        id: 4,
        group: "Wrocław",
        surname: "Stark",
        name: "Arya",
        invitationAccepted: "Nie",
        invitationSend: true,
      },
      {
        id: 5,
        group: "Wrocław",
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
        group: "Kielce",
        surname: "Lannister",
        name: "Cersei",
        invitationAccepted: "?",
        invitationSend: false,
      },
      {
        id: 3,
        group: "Kielce",
        surname: "Lannister",
        name: "Jaime",
        invitationAccepted: "?",
        invitationSend: true,
      },
    ],
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      height: 400,
      width: "100%",
    },
    groupItem: {
      backgroundColor: "#FFEFE9",
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
      padding: 0,
    },
  })
);

export default function GuestList() {
  const classes = useStyles();
  return (
    <List
      className={classes.main}
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
          <>
            <ListItem
              key={group.name}
              secondaryAction={
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              }
              disablePadding
              className={classes.groupItem}
            >
              <ListItemText primary={group.name} className={classes.groupTxt} />
            </ListItem>
            <Collapse in={true} timeout="auto">
              <List component="div">
                {group.items.map((item) => (
                  <ListItemButton key={item.id} className={classes.subheader}>
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
                        <CheckIcon color="primary" />
                      ) : (
                        <CloseIcon color="secondary" />
                      )}
                    </ListItemIcon>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
}
