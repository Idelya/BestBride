import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startUsers from "../../public/img/startUsers.jpg";
import Logo from "../Logo";
import { flexbox } from "@mui/system";
import { Link, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";
import axios from "axios";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Wedding } from "../../config/types";
import { AuthStates } from "../../store/slices/auth";
import { OurStore } from "../../store/store";
import FullLoading from "../FullLoading";

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

const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);

const getTime = (weddingDate: Date) => {
  const diff = weddingDate.getTime() - new Date().getTime();
  if (diff > 0) {
    const left = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
    return `${left.days} dni ${left.hours} godzin ${left.minutes} minut ${left.seconds} sekund`;
  }
  return "";
};
export default function Banner() {
  const classes = useStyles();
  const [left, setLeft] = useState("");
  const { loading, me } = useSelector((state: OurStore) => state.authReducer);
  const { data: wedding } = useSWR("api/wedding", fetcherAuth) as {
    data: Wedding;
  };

  useEffect(() => {
    if (wedding && wedding.date) {
      const weddingDate = new Date(wedding.date);
      const timer = setTimeout(() => {
        setLeft(getTime(weddingDate));
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  if (!me || loading === AuthStates.LOADING || !wedding) {
    return <FullLoading />;
  }

  return (
    <div className={classes.banner}>
      <div className={classes.img}>
        <Image src={startUsers} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.contentBanner}>
        <DecorationTypography variant="h5" className={classes.spacing}>
          {me.name || me.email}
        </DecorationTypography>
        {wedding.date && (
          <>
            <Typography variant="h5" className={classes.spacing}>
              Do Twojego ślubu zostało:
            </Typography>
            <DecorationTypography variant="h5" className={classes.spacing}>
              {left}
            </DecorationTypography>
          </>
        )}
        <UnderlinedLink
          route={{
            ...ROUTES.organizer,
            name: "Zobacz co zostało jescze do zrobienia",
          }}
        />
      </div>
    </div>
  );
}
