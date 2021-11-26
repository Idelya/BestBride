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
import { store } from "react-notifications-component";
import request from "../../config/requests";
import { phaseSchemaValidation, initialValues } from "../../schema/PhaseSchema";
import axios from "axios";

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
      justifyContent: "center",
      margin: theme.spacing(2, 0),
      "& > *": {
        margin: theme.spacing(0, 1),
      },
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface AddPhaseProps {
  open: boolean;
  handleClose: () => void;
  update: () => void;
}
export default function AddPhase({ open, handleClose, update }: AddPhaseProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: phaseSchemaValidation,
    onSubmit: async (values) => {
      try {
        const x = await axios.post("/api/phaseAdd", values);
        if (x.data) {
          handleClose();
          update();
          store.addNotification({
            title: "Sukces",
            message: "Dodano nowy etap.",
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
        <Divider variant="h5" textAlign="center">
          Dodawanie etapu
        </Divider>
        <Grid container>
          <Grid item xs={12} md={12}>
            <div className={classes.inline}>
              <Typography component="label" color="GrayText" variant="h6">
                Nazwa:
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
          <Grid item xs={12} md={12} className={classes.inline}>
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
