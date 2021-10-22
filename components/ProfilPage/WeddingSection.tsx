import React, { useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Autocomplete,
  Button,
  Container,
  Link,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { ROUTES } from "../../config/configNav";
import SignInForm from "../SignInForm";
import Divider from "../Divider";
import { useFormik } from "formik";
import RectangularButton from "../RectangularButton";
import UploadImage from "../UploadFiles";
import {
  initialValues,
  roleOptions,
  weddingSchemaValidation,
} from "../../schema/WeddingDataSchema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
      width: "min-content",
    },
    form: {
      width: "fit-content",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      marginTop: theme.spacing(5),
      "& >*": {
        margin: theme.spacing(2),
      },
    },
    spacing: {
      margin: theme.spacing(0, 1),
    },
    btnAdd: {
      "& :hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function WeddingSection() {
  const classes = useStyles();
  const [value, setValue] = useState<Date | null>(new Date());
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: weddingSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container component="section">
      <Divider textAlign="right">Dane ślubu</Divider>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div>
          <TextField
            id="role"
            select
            name="role"
            size="small"
            label=""
            value={formik.values.role}
            onChange={formik.handleChange}
            className={classes.spacing}
          >
            {roleOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="namePartner"
            name="namePartner"
            size="small"
            label="Imię partnera"
            value={formik.values.namePartner}
            onChange={formik.handleChange}
            className={classes.spacing}
          />
          <TextField
            id="surnamePartner"
            name="surnamePartner"
            label="Nazwisko partnera"
            size="small"
            value={formik.values.surnamePartner}
            onChange={formik.handleChange}
            className={classes.spacing}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField id="weddingDate" name="weddingDate" {...props} />
            )}
            label="Data ślubu"
            value={value}
            onChange={(newValue: Date | null) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          id="church"
          name="church"
          label="Kościół"
          value={formik.values.church}
          onChange={formik.handleChange}
        />

        <Autocomplete
          options={[]}
          value={formik.values.witness1}
          onChange={formik.handleChange}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField name="witness1" label="Świadek" {...params} />
          )}
        />
        <Autocomplete
          options={[]}
          value={formik.values.witness2}
          onChange={formik.handleChange}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField name="witness2" label="Świadek" {...params} />
          )}
        />
        <Link href="#" className={classes.btnAdd}>
          <Typography color="GrayText" variant="body2">
            Dodaj gościa
          </Typography>
        </Link>
        <RectangularButton
          color="primary"
          variant="outlined"
          size="medium"
          type="submit"
          className={classes.button}
        >
          Zapisz
        </RectangularButton>
      </form>
    </Container>
  );
}
