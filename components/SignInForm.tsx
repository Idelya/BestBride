import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Link, TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "./RectangularButton";
import UnderlinedLink from "./UnderlinedLink";
import { Route } from "../config/types";
import { useRouter } from "next/dist/client/router";
import { useFormik } from "formik";
import { signInSchemaValidation, initialValues } from "../schema/SignInSchema";

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

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchemaValidation,
    onSubmit: async ({ email, password }) => {
      const res = await fetch(
        "https://b7qmjo4jy8.execute-api.us-east-2.amazonaws.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ApiKey: "43t3$H#V)0U83vnru#V)(NRU)#VRnu930)(URVN#(U@*YRV&@YR&",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      console.log(res);

      await router.push("/profil");
    },
  });

  return (
    <div className={classes.form}>
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
        className={classes.button}
      >
        Zaloguj się
      </RectangularButton>
      <Typography color="GrayText" variant="body2">
        Chcesz założyć konto?
      </Typography>
      <UnderlinedLink route={routeSignUp} />
    </div>
  );
}
