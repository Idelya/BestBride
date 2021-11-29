import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signup.jpg";
import Logo from "../Logo";
import { TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import { ROUTES } from "../../config/configNav";
import SignUpForm from "../SignUpForm";
import { toBase64 } from "../../utils/helpers";
import { ImgPlaceholder } from "../ImgPlaceholder";

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
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            ImgPlaceholder(400, 475)
          )}`}
        />
      </div>
      <div className={classes.contentBanner}>
        <Logo variantLogo="h3" />
        <SignUpForm routeSignIn={ROUTES.signInClient} />
      </div>
    </div>
  );
}
