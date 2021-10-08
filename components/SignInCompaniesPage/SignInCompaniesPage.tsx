import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signUpCompanies.jpg";
import Logo from "../Logo";
import { Link, TextField, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import SignInForm from "../SignInForm";

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

export default function SignInCompaniesPage() {
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
        <Logo variantCompanies="h6" variantLogo="h3" isForCompanies />
        <SignInForm routeSignUp={ROUTES.signUpCompanies} />
      </div>
    </div>
  );
}
