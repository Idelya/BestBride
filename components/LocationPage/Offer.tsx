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
    content: {
      textAlign: "center",
      minHeight: "300px",
    },
  })
);

export default function Offer({
  service,
  mode = "view",
}: {
  service: Service;
  mode?: "view" | "edit";
}) {
  const classes = useStyles();
  return <div className={classes.content}>{service.offer}</div>;
}
