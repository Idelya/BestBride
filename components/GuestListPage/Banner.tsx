import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
import img from "../../public/img/guestList.jpg";
import Heading from "../Heading";
import DecorationTypography from "../DecorationTypography";
import axios from "axios";
import useSWR from "swr";

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
      flexDirection: "column",
    },
    spacing: {
      margin: theme.spacing(1),
    },
  })
);

const summarry = ["#000000", "#64150F", "#E19A80", "#6F6F6F"];

const statsNames = {
  allGuests: "Wszyscy goście",
  children: "Dzieci",
  confirmed: "Potwierdzeni goście",
  invited: "Zaproszeni goście",
  planned: "Planowani goście",
};

interface StatsBasic {
  allGuests: string;
  children: string;
  confirmed: string;
  invited: string;
  planned: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function Banner() {
  const classes = useStyles();
  const { data: stats } = useSWR("api/statsGuestBasic", fetcher) as {
    data: StatsBasic;
    mutate: any;
    error: any;
  };

  return (
    <Grid container className={classes.container}>
      <Grid item md={5} className={classes.summary}>
        {Object.keys(stats || {}).map((elem, i) => (
          <Typography
            key={i}
            sx={{ color: summarry[i % summarry.length] }}
            variant="h5"
            className={classes.spacing}
            //@ts-ignore
          >{`${statsNames[elem]}: ${stats[elem]}`}</Typography>
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
