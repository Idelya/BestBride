import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
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
import Divider from "../Divider";
import { number } from "yup";

const locations = [
  {
    id: 1,
    img: "https://restauracjaakademia.pl/wp-content/uploads//2018/04/restauracja-akademia-trendy-gastronomiczne-blog.jpg",
    status: "Wersja robocza",
    name: "Sklep 1",
  },
  {
    id: 2,
    img: "",
    status: "Wersja robocza",
    name: "Sklep 2",
  },
  {
    id: 3,
    img: "",
    status: "Wersja robocza",
    name: "Sklep 3",
  },
  {
    id: 4,
    img: "",
    status: "Wersja robocza",
    name: "Sklep 4",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
      minHeight: "100vh",
    },
    grid: {
      marginTop: theme.spacing(2),
    },
    card: {
      position: "relative",
      backgroundColor: "#F8F8F8",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "40%",
      backgroundColor: "rgba(255,255,255,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "solid thin " + theme.palette.primary.main,
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
  })
);
export default function CompaniesLocationsListPage() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Divider textAlign="center">Twoje lokalizacje</Divider>
      <Grid container spacing={4} className={classes.grid}>
        {locations.map((loc) => (
          <Grid item md={4} key={loc.id}>
            <Card className={classes.card}>
              <CardActionArea>
                {!loc.img && <CardContent className={classes.background} />}
                <CardMedia
                  component="img"
                  height="250"
                  image={loc.img}
                  alt=""
                />
                <CardContent className={classes.content}>
                  <Typography color="primary" variant="h5">
                    {loc.name}
                  </Typography>
                </CardContent>
                <CardContent
                  className={classes.status}
                  sx={{ backgroundColor: "#FDFFE6" }}
                >
                  <Typography color="primary" variant="subtitle1">
                    {loc.status}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
