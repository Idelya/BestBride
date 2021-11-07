import React, { useState } from "react";
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
import { ServiceStatusType } from "../../config/types";
import ImageGallery from "react-image-gallery";

const location = {
  id: 1,
  img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
  status: "Wersja robocza" as ServiceStatusType,
  name: "Sklep 1",
  offer: "",
};

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

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
export default function Gallery() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ImageGallery items={images} />
    </div>
  );
}
