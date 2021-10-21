import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Link, TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "./RectangularButton";
import UnderlinedLink from "./UnderlinedLink";
import { Route } from "../config/types";
import { useRouter } from "next/dist/client/router";
import { useFormik } from "formik";
import { signInSchemaValidation, initialValues } from "../schema/SignInSchema";
import { useDispatch, useSelector } from "react-redux";
import { store } from "react-notifications-component";
import { login } from "../store/slices/auth";
import { MyThunkDispatch, OurStore } from "../store/store";

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
    link: {
      textDecoration: "none",
      "& :hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

interface SignInFormProps {
  routeSignUp: Route;
}

export default function SignInForm({ routeSignUp }: SignInFormProps) {
  const classes = useStyles();

  const dispatch: MyThunkDispatch = useDispatch();
  const { loading, me, error } = useSelector(
    (state: OurStore) => state.authReducer
  );
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchemaValidation,
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        await dispatch(login(values));
        router.push("/profil");
      } catch (e) {
        store.addNotification({
          title: "Error",
          message: "Nie można się zalogować",
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
      <Link href="#" className={classes.link}>
        <Typography color="GrayText" variant="body2">
          Zapomniałem hasła
        </Typography>
      </Link>
      <RectangularButton
        color="primary"
        variant="outlined"
        size="medium"
        type="submit"
        className={classes.button}
      >
        Zaloguj się
      </RectangularButton>
      <Typography color="GrayText" variant="body2">
        Chcesz założyć konto?
      </Typography>
      <UnderlinedLink route={routeSignUp} />
    </form>
  );
}
