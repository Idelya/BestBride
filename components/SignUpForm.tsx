import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "./RectangularButton";
import UnderlinedLink from "./UnderlinedLink";
import { Route } from "../config/types";
import { signUpSchemaValidation, initialValues } from "../schema/SignUpSchema";
import { useFormik } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      marginTop: theme.spacing(3),
    },
    button: {
      textAlign: "center",
      margin: theme.spacing(3),
      textTransform: "none",
    },
  })
);

interface SignUpFormProps {
  routeSignIn: Route;
}
export default function SignUpForm({ routeSignIn }: SignUpFormProps) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <TextField
        id="email"
        name="email"
        label="E-mail"
        size="small"
        variant="outlined"
        margin="normal"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <TextField
        id="password"
        name="password"
        label="Hasło"
        size="small"
        variant="outlined"
        margin="normal"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <TextField
        id="repeatPassword"
        name="repeatPassword"
        label="Powtórz hasło"
        size="small"
        variant="outlined"
        margin="normal"
        type="password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
      />
      <RectangularButton
        color="primary"
        variant="outlined"
        size="medium"
        className={classes.button}
        type="submit"
      >
        Zarejestruj się
      </RectangularButton>
      <Typography color="GrayText" variant="body2">
        Posiadasz już konto?
      </Typography>
      <UnderlinedLink route={routeSignIn} />
    </form>
  );
}
