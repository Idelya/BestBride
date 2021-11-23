import React, { useContext, useState } from "react";
import Image from "next/image";
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
  IconButton,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import ImageGallery from "react-image-gallery";
import { ServiceContext } from "./ServiceContext";
import UploadImage from "../UploadFiles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: "200px",
      width: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "& > div": {
        width: "100%",
      },
    },
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

  const { mode, currentService, setService, gallery, setGallery } =
    useContext(ServiceContext);
  console.log(gallery);
  return (
    <div className={classes.container}>
      {mode === "edit" ? (
        <List>
          <Typography>
            Dodawaj i usuwaj zdjęcia w sowjej galerii. Maksymalnie możesz
            załadować 5 zdjęć. Jeżeli nie chcesz mieć zdjęć na swojej stronie,
            wystarczy, że nie dodasz żadnego zdjęcia, a sekcja ta zostanie
            ukryta.
          </Typography>
          <Typography>
            Dodaj zdjęcie:
            <UploadImage
              id="gallery"
              onImageChange={(img, file) => {
                console.log("on Image change");
                console.log(img, file);
                setService({
                  ...currentService,
                  images: (currentService?.images
                    ? currentService.images.concat([img])
                    : [img]) as string[],
                });
                console.log(currentService);
                setGallery((gallery || []).concat([file]));
              }}
            />
          </Typography>

          {currentService?.images &&
            currentService?.images.map((link, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      setService({
                        ...currentService,
                        images: (currentService.images || []).filter(
                          (o) => o != link
                        ),
                      });
                      setGallery(
                        (gallery || []).filter((_, index) => index != i)
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <div className={classes.media}>
                  <Image
                    className={classes.media}
                    src={link}
                    alt="gallery_img"
                    layout="responsive"
                    width={250}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              </ListItem>
            ))}
        </List>
      ) : (
        <ImageGallery
          items={
            currentService?.images?.map((link) => {
              return {
                original: link,
                thumbnail: link,
              };
            }) || []
          }
        />
      )}
    </div>
  );
}
