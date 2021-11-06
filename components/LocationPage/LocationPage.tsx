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
import { useRouter } from "next/router";
import Banner from "./Banner";
import { ServiceStatusType } from "../../config/types";
import Offer from "./Offer";

const location = {
  id: 1,
  img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
  status: "Wersja robocza" as ServiceStatusType,
  name: "Sklep 1",
  offer: "",
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
  })
);
export default function LocationPage() {
  const classes = useStyles();
  return (
    <div>
      <Banner service={location} />
      <Container>
        <Divider>Oferta</Divider>
        <Offer service={location} />
        <Divider textAlign="right">Galeria</Divider>
        <Divider>Kontakt</Divider>
      </Container>
    </div>
  );
}
