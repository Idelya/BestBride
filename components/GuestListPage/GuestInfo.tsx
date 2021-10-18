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
      transform: "translate(-50%, -50%)",
      padding: theme.spacing(5),
      borderRadius: theme.spacing(5),
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
          variant="h6"
        >{`${guest.name} ${guest.surname}`}</Divider>
      </Box>
    </Modal>
  );
}
