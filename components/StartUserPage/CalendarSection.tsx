import React from "react";
import Image from "next/image";
import { chunk } from "lodash";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/startUser.jpg";
import Logo from "../Logo";
import Banner from "./Banner";
import { IconButton, Container, Theme, Typography } from "@mui/material";
import { theme } from "../../utils/theme";
import CalendarElement from "./CalendarElement";
import Carousel from "react-material-ui-carousel";
import { Event } from "../../config/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const events = [
  {
    name: "Przymiarka sukni",
    date: "13:00 31.10.2021",
    lokalizacja: "Wrocław Świdnicka 4",
    przypisano: ["Agnieszka"],
  },
  {
    name: "Testowanie menu",
    date: "15:30 04.11.2021",
    lokalizacja: "Wrocław ul. Śliczna 14",
    przypisano: ["Agnieszka", "Mateusz"],
  },
  {
    name: "Rozmowa z forografem",
    date: "19:30 04.11.2021",
    lokalizacja: "Wrocław ul. Ładna 14",
    przypisano: ["Agnieszka"],
  },
  {
    name: "Odbiór obrączek",
    date: "15:30 04.12.2021",
    lokalizacja: "Wrocław ul. ",
    przypisano: ["Agnieszka", "Mateusz"],
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
      margin: theme.spacing(0, 2),
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
