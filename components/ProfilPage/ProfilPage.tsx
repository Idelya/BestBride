import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signup.jpg";
import Logo from "../Logo";
import { Link, TextField, Theme, Typography } from "@mui/material";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import { ROUTES } from "../../config/configNav";
import SignInForm from "../SignInForm";
import Divider from "../Divider";
import { spacing } from "@mui/system";
import ProfilSection from "./ProfilSection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
    },
  })
);

export default function ProfilPage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ProfilSection />
    </div>
  );
}
