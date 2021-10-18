import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import AddIcon from "@mui/icons-material/Add";
import useToggle from "../../utils/useToggle";
import RectangularButton from "../RectangularButton";
import Filters from "./Filters";
import GuestList from "./GuestList";
import { Guest } from "../../config/types";
import { style } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: "70vw",
      backgroundColor: theme.palette.background.default,
      border: "solid thin " + theme.palette.primary.main,
      margin: "auto",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -30%)",
      padding: theme.spacing(0, 5, 5),
      borderRadius: theme.spacing(5),
    },
    inline: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface GuestInfoProps {
  open: boolean;
  handleClose: () => void;
  guest?: Guest;
}
export default function GuestInfo({
  open,
  handleClose,
  guest,
}: GuestInfoProps) {
  const classes = useStyles();

  if (!guest) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.main}>
        <Divider
          component="p"
          variant="h5"
          secondary="Gość"
          textMargin="64px"
        >{`${guest.name} ${guest.surname}`}</Divider>
        <Grid container>
          <Grid item xs={12} md={6} pr={8}>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Mail:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.mail}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Tel:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.phone}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Miasto:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.city}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Dzieci:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.children}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Wysłano zaproszenie:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.invitationSend ? "Tak" : "Nie"}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Zaakceptowano:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.invitationAccepted}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Jest świadkiem:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.witness ? "Tak" : "Nie"}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} pr={8} pl={8}>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Osoba towarzysząca:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.accompanyingPerson || "Nie"}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Nocleg:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.accommodation ? "Tak" : "Nie"}
              </Typography>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Dojazd:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.transport ? "Tak" : "Nie"}
              </Typography>
            </div>
            <div>
              <List>
                <Typography color="GrayText" variant="h6">
                  Grupy:
                </Typography>
                {guest.groups.map((group) => (
                  <ListItemText color="primary" key={group}>
                    {group}
                  </ListItemText>
                ))}
                {guest.groups.length === 0 && (
                  <ListItemText color="primary">Brak</ListItemText>
                )}
              </List>
              <List>
                <Typography color="GrayText" variant="h6">
                  Diety:
                </Typography>
                {guest.diets.map((diet) => (
                  <ListItemText color="primary" key={diet}>
                    {diet}
                  </ListItemText>
                ))}
                {guest.diets.length === 0 && (
                  <ListItemText color="primary">Brak</ListItemText>
                )}
              </List>
            </div>
          </Grid>
          <Grid item md={12}>
            <div className={classes.block}>
              <Typography color="GrayText" variant="h6">
                Uwagi:
              </Typography>
              <Typography color="primary" variant="h6">
                {guest.remarks || "Brak uwag"}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
