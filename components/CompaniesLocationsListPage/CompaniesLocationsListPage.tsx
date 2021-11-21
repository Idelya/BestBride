import React from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Divider from "../Divider";
import { number } from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Service } from "../../config/types";
import Loading from "../Loading";

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
    btn: {
      textDecoration: "none",
      "& *": {
        textDecoration: "none",
      },
    },
  })
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function CompaniesLocationsListPage() {
  const classes = useStyles();
  const router = useRouter();

  const redirectToLocationPage = async (id: number) => {
    await router.push(`services/${id}`);
  };

  const redirectToNewPage = async () => {
    await router.push(`services/new`);
  };
  /*
  const { data: locations } = useSWR("api/locations", fetcher) as {
    data: Service[];
  };*/
  const locations: Service[] = [];

  console.log(locations);

  if (!locations) {
    return (
      <Container className={classes.container}>
        <Loading />
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Button
        startIcon={<AddIcon />}
        onClick={redirectToNewPage}
        className={classes.btn}
      >
        Dodaj usługę
      </Button>
      <Divider textAlign="center">Twoje usługi</Divider>
      <Grid container spacing={4} className={classes.grid}>
        {!locations || locations.length === 0 ? (
          <Grid item xs={12}>
            <Typography>Nie masz jeszcze żadnych usług.</Typography>
          </Grid>
        ) : (
          locations.map((loc) => (
            <Grid item md={4} key={loc.id}>
              <Card className={classes.card}>
                <CardActionArea
                  onClick={async () =>
                    loc.id
                      ? await redirectToLocationPage(loc.id)
                      : console.error("Lokalizacja nie istnieje")
                  }
                >
                  {!loc.fileLink && (
                    <CardContent className={classes.background} />
                  )}
                  <CardMedia
                    component="img"
                    height="250"
                    image={loc.fileLink}
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
          ))
        )}
      </Grid>
    </Container>
  );
}
