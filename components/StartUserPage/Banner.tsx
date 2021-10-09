import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startUser.jpg";
import Logo from "../Logo";
import { flexbox } from "@mui/system";
import { Link, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    img: {
      position: "relative",
      height: "100vh",
      width: "100%",
      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.44)",
      },
    },
    banner: {
      position: "relative",
      height: "100vh",
      width: "100%",
    },
    contentBanner: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.44)",
      top: "50%",
      left: "50%",
      padding: theme.spacing(8),
      border: "1px solid " + theme.palette.primary.main,
      transform: " translate(-50%, -50%)",
      width: "60%",
      height: "60%",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    logo: {
      backgroundColor: theme.palette.common.white,
      border: "1px solid " + theme.palette.primary.main,
      padding: theme.spacing(5) + " " + theme.spacing(20),
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    spacing: {
      margin: theme.spacing(3),
    },
    button: {
      textAlign: "center",
      margin: theme.spacing(1),
      textTransform: "none",
    },
  })
);

export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <div className={classes.img}>
        <Image src={startCompanies} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.contentBanner}>
        <DecorationTypography variant="h5" className={classes.spacing}>
          Alicja i Adam
        </DecorationTypography>
        <Typography variant="h5" className={classes.spacing}>
          Do waszego ślubu zostało:
        </Typography>
        <DecorationTypography variant="h5" className={classes.spacing}>
          75 dni 13 godzin 45 minut
        </DecorationTypography>
      </div>
    </div>
  );
}
