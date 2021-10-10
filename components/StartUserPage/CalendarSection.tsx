import React from "react";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import { IconButton, Container, Theme, Typography } from "@mui/material";
import CalendarElement from "./CalendarElement";
import Carousel from "react-material-ui-carousel";
import { Event } from "../../config/types";

const events = [
  {
    name: "Przymiarka sukni",
    date: "13:00 31.10.2021",
    localization: "Wrocław Świdnicka 4",
    assigned: ["Agnieszka"],
  },
  {
    name: "Testowanie menu",
    date: "15:30 04.11.2021",
    localization: "Wrocław ul. Śliczna 14",
    assigned: ["Agnieszka", "Mateusz"],
  },
  {
    name: "Rozmowa z fotografem",
    date: "19:30 04.11.2021",
    localization: "Wrocław ul. Ładna 14",
    assigned: ["Agnieszka"],
  },
  {
    name: "Odbiór obrączek",
    date: "15:30 04.12.2021",
    localization: "Wrocław ul. ",
    assigned: ["Agnieszka", "Mateusz"],
  },
];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      padding: theme.spacing(3, 7),
    },
    container: {
      padding: theme.spacing(14, 0),
    },
    carouselItem: {
      display: "flex",
    },
    header: {
      margin: theme.spacing(0, 5),
    },
  })
);

export default function CalendarSection() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.spacing + " " + classes.header}
      >
        Twój kalendarz
      </Typography>
      <Carousel
        animation="slide"
        autoPlay={false}
        timeout={700}
        navButtonsAlwaysVisible
        indicators={false}
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            color: "#64150F",
          },
        }}
      >
        {chunk(events, 3).map((itemCarousel: Event[], key: number) => (
          <div
            key={key}
            className={classes.carouselItem + " " + classes.spacing}
          >
            {itemCarousel.map((event: Event, i: number) => (
              <CalendarElement event={event} key={i} />
            ))}
          </div>
        ))}
      </Carousel>
    </Container>
  );
}
