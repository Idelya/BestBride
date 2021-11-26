import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { getValue, getValueFromDiet } from "../../utils/helpers";
import { GuestContext } from "./GuestContext";
import Loading from "../Loading";
import axios from "axios";
import { store } from "react-notifications-component";
import GuestEdit from "./GuestEdit";

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
    btn: {
      position: "absolute",
      right: theme.spacing(3),
      top: theme.spacing(3),
      display: "flex",
      justifyContent: "flex-end",
      "& *": {
        textTransform: "none",
      },
    },
  })
);

interface GuestInfoProps {
  open: boolean;
  handleClose: () => void;
  guest: Guest;
  update: () => void;
}
export default function GuestInfo({
  open,
  handleClose,
  guest,
  update,
}: GuestInfoProps) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const { genderOptions, dietsOptions, statusOptions } =
    useContext(GuestContext);

  const handleDelete = async (id: number) => {
    try {
      const x = await axios.delete("/api/guestDel/" + id);
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Usunieto gościa.",
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
        update();
        handleClose();
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
  if (!open || !genderOptions || !dietsOptions || !statusOptions) {
    <Modal open={open} onClose={handleClose}>
      <Loading />
    </Modal>;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.main}>
        <Box className={classes.btn}>
          {!editMode && (
            <>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edytuj
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(guest.id)}
              >
                Usuń
              </Button>
            </>
          )}
        </Box>
        <Divider
          component="p"
          variant="h5"
          secondary="Gość"
          textMargin="64px"
        >{`${guest.name}`}</Divider>
        {editMode ? (
          <GuestEdit
            guest={guest}
            handleSave={() => {
              setEditMode(false);
              handleClose();
              update();
            }}
          />
        ) : (
          <Grid container>
            <Grid item xs={12} md={6} pr={8}>
              <div className={classes.inline}>
                <Typography color="GrayText">Płeć:</Typography>
                <Typography color="primary">
                  {getValue(genderOptions || [], guest.gender)}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Mail:</Typography>
                <Typography color="primary">{guest.email}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Tel:</Typography>
                <Typography color="primary">{guest.phone}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Miasto:</Typography>
                <Typography color="primary">{guest.city}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Dzieci:</Typography>
                <Typography color="primary">{guest.children}</Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Status zaproszenia:</Typography>
                <Typography color="primary">
                  {getValue(statusOptions || [], guest.status)}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Jest świadkiem:</Typography>
                <Typography color="primary">
                  {guest.isWitness ? "Tak" : "Nie"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6} pr={8} pl={8}>
              <div className={classes.block}>
                <Typography color="GrayText">Osoba towarzysząca:</Typography>
                <Typography color="primary">
                  {guest.partnerName || "Nie"}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Nocleg:</Typography>
                <Typography color="primary">
                  {guest.accommodation ? "Tak" : "Nie"}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Dojazd:</Typography>
                <Typography color="primary">
                  {guest.transport ? "Tak" : "Nie"}
                </Typography>
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText">Dieta:</Typography>
                <Typography color="primary">
                  {getValueFromDiet(dietsOptions || [], guest.diet)}
                </Typography>
              </div>
              <div>
                <List>
                  <Typography color="GrayText">Grupy:</Typography>
                  {!guest.groups ? (
                    <ListItemText color="primary">Brak</ListItemText>
                  ) : (
                    guest.groups.map((group, i) => (
                      <ListItemText color="primary" key={i}>
                        {group.name || ""}
                      </ListItemText>
                    ))
                  )}
                </List>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.block}>
                <Typography color="GrayText">Uwagi:</Typography>
                <Typography color="primary">
                  {guest.additionalInfo || "Brak uwag"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
}
