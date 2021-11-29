import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startCompanies.jpg";
import Logo from "../Logo";
import { Box, flexbox } from "@mui/system";
import { Container, Grid, Link, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";
import Banner from "./Banner";
import photo1 from "../../public/img/companies1.jpg";
import photo2 from "../../public/img/companies2.jpg";
import { toBase64 } from "../../utils/helpers";
import { ImgPlaceholder } from "../ImgPlaceholder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spacing: {
      margin: theme.spacing(8) + " " + 0,
    },
    spacingBottom: {
      marginBottom: theme.spacing(3),
    },
  })
);

const articles = [
  {
    text: [
      `Czy wiesz, że w Polsce rocznie ślub bierze 145 tys. par rocznie?`,
      `Best Bride pomaga zaplanować idealny ślub i wesele udostępniając takie funkcje 
    jak planner, kalendarz, zarządzanie budżetem i wydatkami, listą gości, 
    a także wyszukiwanie usług - zarówno w przeglądarce jak i na urządzeniach mobilnych.`,
    ],
    photo: photo1,
  },
  {
    text: [
      `Dołączając do nas udostępniasz swoją firmę wszystkim użytkownikom Best Bride!`,
      ` 
    Best Bride dla firm pozwala spersonalizować opis, dodać zdjęcia, kontakt i lokalizację, 
    co pomoże Ci się wyróżnić na tle innych firm.`,
      `Rejestracja jest całkowicie bezpłatna!`,
    ],
    photo: photo2,
  },
];
export default function ArticleBestBride() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} className={classes.spacing}>
          {articles[0].text.map((text, i) => (
            <Typography
              key={i}
              className={classes.spacingBottom}
              variant="body1"
            >
              {text}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} md={6} className={classes.spacing}>
          <Image
            alt=""
            src={articles[0].photo}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              ImgPlaceholder(400, 475)
            )}`}
          />
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} className={classes.spacing}>
          <Image
            alt=""
            src={articles[1].photo}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              ImgPlaceholder(400, 475)
            )}`}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.spacing}>
          {articles[1].text.map((text, i) => (
            <Typography key={i} className={classes.spacingBottom}>
              {text}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
