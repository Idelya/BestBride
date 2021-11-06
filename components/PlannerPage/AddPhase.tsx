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
}
export default function AddPhase({ open, handleClose }: AddPhaseProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: phaseSchemaValidation,
    onSubmit: async (values) => {
      console.log(values);
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
