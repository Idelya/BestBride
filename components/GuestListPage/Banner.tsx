import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import Logo from "../Logo";
import { flexbox } from "@mui/system";
import { Grid, Link, Theme, Typography } from "@mui/material";
import img from "../../public/img/guestList.jpg";
import Heading from "../Heading";
import DecorationTypography from "../DecorationTypography";
import { textAlign } from "@mui/lab/node_modules/@mui/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    decorator: {
      backgroundColor: "#FFEFE9",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      padding: theme.spacing(10, 6),
      width: "380px",
      textAlign: "center",
      whiteSpace: "nowrap",
      position: "absolute",
      top: theme.spacing(10),
      left: theme.spacing(7),
      zIndex: -1,
    },
    img: {
      width: "300px",
      position: "absolute",
      top: theme.spacing(5),
      right: 0,
      zIndex: -2,
    },
    headingBox: {
      width: "55%",
      position: "relative",
      right: 0,
      top: theme.spacing(5),
    },
    container: {
      display: "flex",
      minHeight: "600px",
    },
    summary: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      flexDirection: "column",
    },
    spacing: {
      margin: theme.spacing(1),
    },
  })
);

const summarry = [
  {
    name: "Potwierdzone:",
    value: 68,
    color: "#000000",
  },
  {
    name: "Zaproszone:",
    value: 130,
    color: "#64150F",
  },
  {
    name: "Wszystkie:",
    value: 253,
    color: "#E19A80",
  },
  {
    name: "Oczekujące:",
    value: 37,
    color: "#6F6F6F",
  },
];
export default function Banner() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item md={5} className={classes.summary}>
        {summarry.map((elem, i) => (
          <Typography
            key={i}
            sx={{ color: elem.color }}
            variant="h5"
            className={classes.spacing}
          >{`${elem.name} ${elem.value}`}</Typography>
        ))}
      </Grid>
      <Grid item className={classes.headingBox} md={7}>
        <Heading>Lista gości</Heading>
        <div className={classes.decorator}>
          <DecorationTypography color="primary">
            W tym ważnym dniu bądź
            <br />
            pewny, że nie zabraknie żadnej
            <br />
            bliskiej wam osoby.
          </DecorationTypography>
        </div>
        <div className={classes.img}>
          <Image alt="" src={img} />
        </div>
      </Grid>
    </Grid>
  );
}
