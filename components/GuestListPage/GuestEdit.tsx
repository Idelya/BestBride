import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  List,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { useFormik } from "formik";
import { store } from "react-notifications-component";
import { Guest } from "../../config/types";
import Loading from "../Loading";
import axios from "axios";
import { GuestContext } from "./GuestContext";

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
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface GuestEditProps {
  handleSave: () => void;
  guest: Guest;
  guests?: Guest[];
}

const getFlterPartners = (guests: Guest[]) =>
  guests.filter((guest) => !guest.partner && !guest.partnerName);

export default function GuestEdit({
  handleSave,
  guests = [],
  guest,
}: GuestEditProps) {
  const classes = useStyles();
  const [partner, setPartner] = useState<number | null>(
    guest.partner ? guest.partner : null
  );

  const { genderOptions, dietsOptions, statusOptions } =
    useContext(GuestContext);
  const formik = useFormik({
    initialValues: guest,
    onSubmit: async (values) => {
      const guest = !!partner ? { ...values, partner: partner } : values;
      try {
        const x = await axios.put("/api/guestEdit/" + guest.id, {
          ...guest,
          surname: "",
        });
        if (x.data) {
          store.addNotification({
            title: "Success",
            message: "Edytowano gościa.",
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
          handleSave();
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
    <form onSubmit={formik.handleSubmit} className={classes.main}>
      {!genderOptions || !dietsOptions || !statusOptions ? (
        <Loading />
      ) : (
        <>
          <Divider component="p" variant="h5" textMargin="64px">
            Edycja gościa
          </Divider>
          <Grid container>
            <Grid item xs={12} md={6} pr={8}>
              <div className={classes.inline}>
                <Typography component="label" color="GrayText" variant="h6">
                  Imię i nazwisko:
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
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Płeć:
                </Typography>
                <TextField
                  id="gender"
                  name="gender"
                  select
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  {genderOptions.map((e, i) => (
                    <MenuItem key={i} value={e.key}>
                      {e.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.inline}>
                <Typography component="label" color="GrayText" variant="h6">
                  Mail:
                </Typography>
                <TextField
                  id="email"
                  name="email"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Tel:
                </Typography>
                <TextField
                  id="phone"
                  name="phone"
                  size="small"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Miasto:
                </Typography>
                <TextField
                  id="city"
                  name="city"
                  size="small"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Dzieci:
                </Typography>
                <TextField
                  id="children"
                  name="children"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={formik.values.children}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.children && Boolean(formik.errors.children)
                  }
                  helperText={formik.touched.children && formik.errors.children}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Status zaproszenia:
                </Typography>
                <TextField
                  id="status"
                  name="status"
                  select
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  {statusOptions.map((e, i) => (
                    <MenuItem key={i} value={e.key}>
                      {e.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item xs={12} md={6} pr={8} pl={8}>
              <div className={classes.block}>
                <Typography color="GrayText" variant="h6">
                  Osoba towarzysząca:
                </Typography>
                <Autocomplete
                  id="partner-autocomplete"
                  options={getFlterPartners(guests)}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setPartner(value?.id || null)}
                  includeInputInList
                  renderInput={(params) => (
                    <TextField {...params} name="partner" variant="outlined" />
                  )}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Jest świadkiem:
                </Typography>
                <Checkbox
                  id="isWitness"
                  name="isWitness"
                  value={formik.values.isWitness}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Nocleg:
                </Typography>
                <Checkbox
                  id="accommodation"
                  name="accommodation"
                  value={formik.values.accommodation}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Dojazd:
                </Typography>
                <Checkbox
                  id="transport"
                  name="transport"
                  value={formik.values.transport}
                  onChange={formik.handleChange}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Wiek:
                </Typography>
                <TextField
                  id="age"
                  name="age"
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </div>
              <div className={classes.inline}>
                <Typography color="GrayText" variant="h6">
                  Dieta:
                </Typography>
                <TextField
                  id="diet"
                  name="diet"
                  select
                  value={formik.values.diet}
                  onChange={formik.handleChange}
                >
                  {dietsOptions.map((e, i) => (
                    <MenuItem key={i} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.block}>
                <Typography color="GrayText" variant="h6">
                  Uwagi:
                </Typography>
                <TextField
                  id="additionalInfo"
                  name="additionalInfo"
                  size="small"
                  type="text"
                  fullWidth
                  rows={3}
                  value={formik.values.additionalInfo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.additionalInfo &&
                    Boolean(formik.errors.additionalInfo)
                  }
                  helperText={
                    formik.touched.additionalInfo &&
                    formik.errors.additionalInfo
                  }
                />
              </div>
            </Grid>
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
        </>
      )}
    </form>
  );
}
