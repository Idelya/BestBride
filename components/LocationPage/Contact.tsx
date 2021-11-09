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
import { Service, ServiceStatusType } from "../../config/types";
import { Map, Marker, Draggable, ZoomControl } from "pigeon-maps";

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
export default function Contact({
  service,
  mode = "view",
}: {
  service: Service;
  mode?: "view" | "edit";
}) {
  const classes = useStyles();
  const [anchor, setAnchor] = useState<[number, number]>([
    51.10984671890034, 17.032411219787605,
  ]);
  console.log(anchor);
  return (
    <Grid container className={classes.container}>
      <Grid item md={6}></Grid>
      <Grid item md={6}>
        <Map
          height={300}
          defaultCenter={[51.10984671890034, 17.032411219787605]}
          defaultZoom={11}
        >
          <ZoomControl />
          {mode === "edit" ? (
            <Draggable anchor={anchor} onDragEnd={setAnchor}>
              <Marker width={50} color={"#64150F"} anchor={anchor} />
            </Draggable>
          ) : (
            <Marker width={50} color={"#64150F"} anchor={anchor} />
          )}
        </Map>
      </Grid>
    </Grid>
  );
}
