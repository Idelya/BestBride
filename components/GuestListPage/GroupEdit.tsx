import React, { useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import without from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { Form, useFormik } from "formik";
import { groupSchemaValidation, initialValues } from "../../schema/GroupSchema";
import { Group, Guest } from "../../config/types";

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
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },

      {
        id: 4,
        surname: "Stark",
        name: "Arya",
        invitationAccepted: "Nie",
        invitationSend: true,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
      {
        id: 5,
        surname: "Targaryen",
        name: "Daenerys",
        invitationAccepted: "Tak",
        invitationSend: true,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
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
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
      {
        id: 3,
        surname: "Lannister",
        name: "Jaime",
        invitationAccepted: "?",
        invitationSend: true,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
      {
        id: 6,
        surname: "Lannister",
        name: "Tyrion",
        invitationAccepted: "Tak",
        invitationSend: true,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
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
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
      {
        id: 8,
        surname: "Arya",
        name: "Stark",
        invitationAccepted: "?",
        invitationSend: false,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
      {
        id: 9,
        surname: "Robb",
        name: "Stark",
        invitationAccepted: "?",
        invitationSend: false,
        mail: "adres@mail.com",
        phone: "999 000 543",
        children: 0,
        isWithness: false,
        accommodation: false,
        transport: false,
        groups: [],
        diets: [],
      },
    ],
  },
];

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

interface GroupAddProps {
  open: boolean;
  handleClose: () => void;
  group: Group;
}
export default function GroupAdd({ open, handleClose, group }: GroupAddProps) {
  const classes = useStyles();
  const [guestInList, setGuestInList] = useState<Guest[]>(
    group ? group.guests : []
  );
  const searchableGuests = useMemo(
    () =>
      rows
        .map((item) => item.items)
        .flat()
        .filter((o) => !guestInList.includes(o)),
    [guestInList]
  );
  const [searchedGuest, setSearchedGuest] = useState(null);
  const [clear, setClear] = useState(false);

  const formik = useFormik({
    initialValues: { ...initialValues, ...group },
    validationSchema: groupSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify({ ...values, list: guestInList }, null, 2));
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
                getOptionLabel={(option) =>
                  option ? option.name + " " + option.surname : ""
                }
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
                  <ListItemText primary={`${guest?.name} ${guest?.surname}`} />
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
