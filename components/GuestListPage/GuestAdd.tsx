import React, { useState } from "react";
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
import {
  dietsOptions,
  guestSchemaValidation,
  initialValues,
  statusOptions,
} from "../../schema/GuestSchema";
import { store } from "react-notifications-component";
import request from "../../config/requests";

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

interface GuestAddProps {
  open: boolean;
  handleClose: () => void;
}
export default function GuestAdd({ open, handleClose }: GuestAddProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log("submit");
      console.log(values);
      try {
        const url = "/api/guest/";
        console.log(request);
        const x = await request.post(url, { ...values, diet: null });
        console.log(x);
        if (x.data) {
          store.addNotification({
            title: "Success",
            message: "Dodano nowego gościa.",
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
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Divider component="p" variant="h5" textMargin="64px">
          Dodawanie gościa
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
                  <MenuItem key={i} value={e.value}>
                    {e.name}
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
                disablePortal
                id="partner"
                size="small"
                options={[]}
                value={formik.values.partner}
                renderInput={(params) => (
                  <TextField name="partner" {...params} />
                )}
              />
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Jest świadkiem:
              </Typography>
              <Checkbox
                id="isWithness"
                name="isWithness"
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
            <div>
              <List>
                <Typography color="GrayText" variant="h6">
                  Grupy:
                </Typography>
                <Select
                  name="guestsGroupGuests"
                  fullWidth
                  id="guestsGroupGuests"
                  size="small"
                  multiple
                  value={formik.values.guestsGroupGuests}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      name="guestsGroupGuests"
                      id="guestsGroupGuests"
                    />
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {[].map((e, i) => (
                    <MenuItem key={i} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </List>
              <List>
                <Typography color="GrayText" variant="h6">
                  Diety:
                </Typography>
                <Select
                  id="diet"
                  name="diet"
                  multiple
                  size="small"
                  fullWidth
                  value={formik.values.diet}
                  onChange={formik.handleChange}
                  input={<OutlinedInput name="diet" id="diet" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {dietsOptions.map((e, i) => (
                    <MenuItem key={i} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </Select>
              </List>
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
                  formik.touched.additionalInfo && formik.errors.additionalInfo
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
      </form>
    </Modal>
  );
}
