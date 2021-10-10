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
      padding: theme.spacing(3, 0),
      border: "1px solid " + theme.palette.primary.main,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "space-around",
      position: "relative",
      height: "250px",
    },
    header: {
      background: "white",
      padding: "10px",
    },
    headerContainer: {
      width: "100%",
      position: "absolute",
      top: 0,
      transform: "translateY(-50%)",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      padding: theme.spacing(5),
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
        <div className={classes.headerContainer}>
          <Typography variant="h6" color="primary" className={classes.header}>
            {event.name}
          </Typography>
        </div>
        <Typography variant="h6">{event.date}</Typography>
        <Typography variant="subtitle2">
          Lokalizacja: {event.localization}
        </Typography>
        <Typography variant="subtitle2">
          Przypisano:{" "}
          {event.assigned?.map((user, i) => `${i > 0 ? ", " : ""} ${user}`)}
        </Typography>
      </div>
    </div>
  );
}
