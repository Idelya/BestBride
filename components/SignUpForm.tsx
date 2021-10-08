import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { TextField, Theme, Typography } from "@mui/material";
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
  })
);

interface SignUpFormProps {
  routeSignIn: Route;
}
export default function SignUpForm({ routeSignIn }: SignUpFormProps) {
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
      <TextField
        id="password"
        label="Powtórz hasło"
        size="small"
        variant="outlined"
        margin="normal"
        type="password"
      />
      <RectangularButton
        color="primary"
        variant="outlined"
        size="medium"
        className={classes.button}
      >
        Zarejestruj się
      </RectangularButton>
      <Typography color="GrayText" variant="body2">
        Posiadasz już konto?
      </Typography>
      <UnderlinedLink route={routeSignIn} />
    </div>
  );
}
