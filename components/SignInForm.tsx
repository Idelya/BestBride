import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Link, TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "./RectangularButton";
import UnderlinedLink from "./UnderlinedLink";
import { Route } from "../config/types";

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
  routeSignUp?: Route;
}

export default function SignInForm({ routeSignUp }: SignInFormProps) {
  const classes = useStyles();
  return (
    <div className={classes.form}>
      <TextField
        id="login"
        label="E-mail"
        size="small"
        variant="outlined"
        margin="normal"
        type="email"
      />
      <TextField
        id="password"
        label="Hasło"
        size="small"
        variant="outlined"
        margin="normal"
        type="password"
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
      {routeSignUp && (
        <>
          <Typography color="GrayText" variant="body2">
            Chcesz założyć konto?
          </Typography>
          <UnderlinedLink route={routeSignUp} />
        </>
      )}
    </div>
  );
}
