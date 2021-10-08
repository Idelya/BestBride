import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startCompanies.jpg";
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffffD3",
      top: "50%",
      left: "50%",
      padding: theme.spacing(5),
      border: "1px solid " + theme.palette.primary.main,
      transform: " translate(-50%, -50%)",
      width: "70%",
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
        <div className={classes.logo}>
          <Logo isForCompanies variantCompanies="subtitle1" variantLogo="h4" />
        </div>
        <Typography color="primary" variant="h6" className={classes.spacing}>
          Dołącz do nas i zareklamuj swoja firme na Best Bride!
        </Typography>
        <DecorationTypography color="GrayText" variant="caption">
          Logowanie dla firm:
        </DecorationTypography>
        <RectangularButton
          color="primary"
          variant="outlined"
          size="medium"
          className={classes.button}
          href={ROUTES.signInCompanies.link}
        >
          Zaloguj się
        </RectangularButton>
        <UnderlinedLink route={ROUTES.signUpCompanies} />
      </div>
    </div>
  );
}
