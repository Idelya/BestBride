import React, { useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import without from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { Form, useFormik } from "formik";
import { groupSchemaValidation, initialValues } from "../../schema/GroupSchema";
import { Guest } from "../../config/types";
import axios from "axios";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: "80vw",
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
      margin: theme.spacing(2, 0),
      "& >*": {
        margin: theme.spacing(0, 3),
      },
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
    select: {
      minWidth: "200px",
    },
    list: {
      margin: theme.spacing(0, 1),
      height: "300px",
      overflowY: "auto",
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
  })
);

interface GuestAddProps {
  open: boolean;
  handleClose: () => void;
  guests: Guest[];
}
export default function GroupAdd({ open, handleClose, guests }: GuestAddProps) {
  const classes = useStyles();
  const [guestInList, setGuestInList] = useState<Guest[]>([]);
  const searchableGuests = useMemo(
    () => guests.filter((o) => !guestInList.includes(o)),
    [guestInList, guests]
  );

  const [searchedGuest, setSearchedGuest] = useState(null);
  const [clear, setClear] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: groupSchemaValidation,
    onSubmit: async (values) => {
      try {
        const x = await axios.post("api/groupAdd", {
          ...values,
          guests: guestInList.map((g) => g.id),
        });
        console.log(x);
        const y = await axios.post("/api/guestToGroup", {
          group: x?.data?.data.id,
          guests: guestInList.map((g) => g.id),
        });
        if (x.data) {
          handleClose();
          store.addNotification({
            title: "Success",
            message: "Dodano nową grupę.",
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
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Divider component="p" variant="h5" textMargin="64px">
          Dodawanie grupy
        </Divider>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.inline}>
              <Typography component="label" color="GrayText" variant="h6">
                Nazwa grupy:
              </Typography>
              <TextField
                id="name"
                name="name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.inline}>
              <Typography component="label" color="GrayText" variant="h6">
                Dodaj gościa do grupy:
              </Typography>
              <Autocomplete
                size="small"
                key={clear.toString()}
                options={searchableGuests}
                value={searchedGuest}
                className={classes.select}
                getOptionLabel={(option) => option.name}
                //@ts-ignore
                onChange={(e, v) => setSearchedGuest(v)}
                renderInput={(params) => (
                  <TextField
                    name="guest"
                    placeholder="wybierz gościa"
                    {...params}
                  />
                )}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (!!searchedGuest) {
                    setGuestInList(guestInList.concat([searchedGuest]));
                    setSearchedGuest(null);
                    setClear(!clear);
                  }
                }}
              >
                Dodaj
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.list}>
              {guestInList.map((guest) => (
                <ListItem
                  key={guest.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        setGuestInList(guestInList.filter((o) => o != guest))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${guest.name}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              textTransform: "none",
              margin: "8px",
            }}
          >
            <Button
              type="submit"
              sx={{
                textTransform: "none",
              }}
            >
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
