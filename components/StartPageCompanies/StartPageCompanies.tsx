import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startCompanies.jpg";
import Logo from "../Logo";
import { Box, flexbox } from "@mui/system";
import { Container, Grid, Link, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";
import Banner from "./Banner";
import photo1 from "../../public/img/companies1.jpg";
import photo2 from "../../public/img/companies2.jpg";
import ArticleBestBride from "./AboutBestBride";
import SignInForm from "../SignInForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    joinUsForm: {
      backgroundColor: "#FFF2EE",
      padding: theme.spacing(8),
      textAlign: "center",
      "& > div": {
        margin: "auto",
        [theme.breakpoints.down("md")]: {
          width: "70%",
        },
        [theme.breakpoints.up("md")]: {
          width: "50%",
        },
        [theme.breakpoints.up("lg")]: {
          width: "20%",
        },
      },
    },
  })
);

export default function StartPageCompanies() {
  const classes = useStyles();
  return (
    <div>
      <Banner />
      <ArticleBestBride />
      <Box className={classes.joinUsForm}>
        <Typography color="primary" variant="h6">
          Dołącz do nas i zareklamuj swoja firme na Best Bride!
        </Typography>
        <SignInForm routeSignUp={ROUTES.signUpCompanies} />
      </Box>
    </div>
  );
}
