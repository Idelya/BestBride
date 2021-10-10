import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/startUser.jpg";
import Logo from "../Logo";
import Banner from "./Banner";
import { Container, Theme, Typography } from "@mui/material";
import { theme } from "../../utils/theme";
import { Event } from "../../config/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(14, 0),
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "flex-start",
      position: "relative",
    },
    header: {
      position: "absolute",
      top: 0,
      transform: "translateY(-50%)",
      background: "white",
      padding: "10px",
    },
    wrapper: {
      padding: theme.spacing(2),
      width: "33%",
    },
  })
);

interface CalendarElementProps {
  event: Event;
}

export default function CalendarElement({ event }: CalendarElementProps) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography variant="h6" color="primary" className={classes.header}>
          {event.name}
        </Typography>
      </div>
    </div>
  );
}
