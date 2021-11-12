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
import { Service } from "../../config/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    img: {
      position: "relative",
      height: "70vh",
      width: "100%",
    },
    banner: {
      position: "relative",
      height: "80vh",
      minHeight: "500px",
      width: "100%",
    },
    content: {
      position: "absolute",
      zIndex: 2,
      minHeight: "350px",
      top: theme.spacing(15),
      left: theme.spacing(10),
      padding: theme.spacing(5),
      backgroundColor: "rgba(255,255,255,0.95)",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "solid thin " + theme.palette.primary.main,
      fontWeight: "normal",
    },
    link: {
      textDecoration: "none",
      "& :hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function Banner({
  service,
  mode = "view",
}: {
  service: Service;
  mode?: "view" | "edit";
}) {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <div className={classes.content}>
        <Link href="#" className={classes.link}>
          <Typography variant="h5" color="primary">
            Kategoria: restauracje
          </Typography>
        </Link>
        <Typography variant="h3" color="primary">
          {service.name}
        </Typography>
        <br />
        <Typography variant="h6" color="GrayText">
          Kontakt
        </Typography>
        <Typography variant="subtitle1" color="GrayText">
          email
        </Typography>
        <Typography variant="subtitle1" color="GrayText">
          tel.
        </Typography>
      </div>
      <div className={classes.img}>
        <Image src={service.img} alt="" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
