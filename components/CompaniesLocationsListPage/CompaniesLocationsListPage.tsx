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
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Divider from "../Divider";
import { number } from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Service, Option } from "../../config/types";
import Loading from "../Loading";
import { getValue } from "../../utils/helpers";
import request from "../../config/requests";
import { sortBy } from "lodash";

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
      textTransform: "none",
    },
  })
);

const statusTocolor = ["#FDFFE6", "#E6FFFC", "#D4FFD7", "#FFE6E6", "#000000"];
const fetcherUnauth = (url: string) => request.get(url).then((res) => res.data);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default function CompaniesLocationsListPage() {
  const classes = useStyles();
  const router = useRouter();

  const redirectToLocationPage = async (id: number) => {
    await router.push(`services/${id}`);
  };

  const redirectToNewPage = async () => {
    await router.push(`/services/new`);
  };

  const { data: locations } = useSWR("api/locations", fetcher) as {
    data: Service[];
  };
  const { data: statusOptions } = useSWR(
    "api/servicestatus",
    fetcherUnauth
  ) as {
    data: Option[];
  };

  if (!locations) {
    return (
      <Container className={classes.container}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Loading />
        </Box>
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
          sortBy(locations, ["innerKey", "status"]).map((loc) => (
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
                    sx={{ backgroundColor: statusTocolor[loc?.status || 0] }}
                  >
                    <Typography color="primary" variant="subtitle1">
                      {getValue(statusOptions || [], loc.status)}
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
