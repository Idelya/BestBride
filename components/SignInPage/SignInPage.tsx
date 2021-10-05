import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signup.jpg";
import Logo from "../Logo";
import { Link, TextField, Theme, Typography } from "@mui/material";
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
    link: {
      textDecoration: "none",
      "& :hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function SignInPage() {
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
          <UnderlinedLink route={ROUTES.signUpClient} />
        </div>
      </div>
    </div>
  );
}
