import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signup.jpg";
import Logo from "../Logo";
import { TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import { ROUTES } from "../../config/configNav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    img: {
      position: "relative",
      height: "100vh",
      maxWidth: "100vw",
      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.37) 0%, rgba(255,255,255,1) 60%)",
      },
    },
    banner: {
      position: "relative",
      height: "100vh",
      width: "100%",
    },
    contentBanner: {
      position: "absolute",
      right: 0,
      top: 0,
      width: "50%",
      height: "80%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
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

export default function SignUpPage() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <div className={classes.img}>
        <Image
          src={start}
          alt=""
          layout="fill"
          objectFit="contain"
          objectPosition="left top"
        />
      </div>
      <div className={classes.contentBanner}>
        <Logo variantLogo="h3" />
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
          <UnderlinedLink route={ROUTES.signInClient} />
        </div>
      </div>
    </div>
  );
}
