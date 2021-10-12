import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signUpCompanies.jpg";
import Logo from "../Logo";
import {
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
import {
  initialValues,
  profilSchemaValidation,
  roleOptions,
} from "../../schema/ProfilSchema";
import { flexbox } from "@mui/system";
import RectangularButton from "../RectangularButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      justifyContent: "space-around",
    },
    fields: {
      display: "flex",
      flexDirection: "column",
      "& >*": {
        margin: theme.spacing(2),
      },
    },
    button: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
      width: "min-content",
    },
  })
);

export default function ProfilSection() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: profilSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container component="section">
      <Divider>Profil</Divider>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.fields}>
          <TextField
            id="role"
            select
            name="role"
            size="small"
            label=""
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            {roleOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="email"
            name="email"
            size="small"
            label="Email"
            disabled
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Hasło"
            size="small"
            type="password"
            disabled
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <br />
          <TextField
            id="name"
            name="name"
            size="small"
            label="Imię"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <TextField
            id="surname"
            name="surname"
            label="Nazwisko"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <RectangularButton
            color="primary"
            variant="outlined"
            size="medium"
            type="submit"
            className={classes.button}
          >
            Zapisz
          </RectangularButton>
        </div>
      </form>
    </Container>
  );
}
