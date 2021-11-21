import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Card,
  Button,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Theme,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Divider from "../Divider";
import { number } from "yup";
import router, { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Service } from "../../config/types";
import Loading from "../Loading";
import { ServicesContext } from "./ServicesContext";
import Search from "../Search";
import Services from "../../pages/services";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    grid: {
      marginTop: theme.spacing(2),
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.9)",
      height: "200px",
      width: "100%",
    },
    img: {
      width: "40%",
    },
    content: {
      width: "100%",
      height: "100%",
      margin: "auto",
      backgroundColor: "rgba(255,255,255,0.9)",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
    },
    status: {
      position: "absolute",
      height: "18%",
      width: "100%",
      bottom: 0,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
    },
    background: {
      backgroundColor: "#F8F8F8",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    btn: {
      textDecoration: "none",
      "& *": {
        textDecoration: "none",
      },
    },
    text: {
      padding: theme.spacing(3),
    },
  })
);

export default function ServicesList({ list }: { list: Service[] }) {
  const classes = useStyles();
  if (list.length === 0) {
    return (
      <Container className={classes.container}>
        <Typography>Nie ma żadnych usług w tej kategorii</Typography>
      </Container>
    );
  }
  return (
    <List className={classes.container}>
      {list.map((loc) => (
        <ListItem key={loc.id}>
          <Card className={classes.card}>
            <CardActionArea
              onClick={async () => await router.push("services/" + loc.id)}
              className={classes.content}
            >
              <CardMedia
                component="img"
                height="200"
                width="50"
                image={loc.fileLink}
                alt=""
                className={classes.img}
              />
              <CardContent className={classes.text}>
                <Typography color="primary" variant="h5">
                  {loc.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
