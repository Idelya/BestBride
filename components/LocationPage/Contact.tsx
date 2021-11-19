import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Theme,
  Typography,
} from "@mui/material";
import { Service, ServiceStatusType } from "../../config/types";
import { Map, Marker, Draggable, ZoomControl } from "pigeon-maps";
import { ServiceContext } from "./ServiceContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(5, 0),
      "& .image-gallery-thumbnail.active": {
        borderColor: theme.palette.primary.main,
      },
      "& .image-gallery-thumbnail:hover": {
        borderColor: theme.palette.primary.main,
      },
      "& .image-gallery-icon:hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);
export default function Contact() {
  const classes = useStyles();

  const { mode } = useContext(ServiceContext);
  return (
    <Grid container className={classes.container}>
      <Grid item md={6}></Grid>
    </Grid>
  );
}
