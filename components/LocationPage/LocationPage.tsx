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
import Divider from "../Divider";
import { number } from "yup";
import { useRouter } from "next/router";
import Banner from "./Banner";
import { ServiceStatusType } from "../../config/types";
import Offer from "./Offer";
import Gallery from "./Gallery";
import Contact from "./Contact";

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
    controls: {
      position: "fixed",
      right: 0,
      top: "50%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      "& > *": {
        textTransform: "none",
        width: "min-content",
        margin: theme.spacing(1),
      },
    },
  })
);
export default function LocationPage() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [mode, setMode] = useState<"edit" | "view">(
    id === "new" ? "edit" : "view"
  );

  const handleReset = () => {
    //cofnij zmiany
    setMode("view");
  };

  const handleViewVersion = () => {
    //aktualizuj zmiany
    setMode("view");
  };

  const publicVersion = () => {
    //send to verification
  };
  return (
    <div>
      <Banner service={location} />
      <Container>
        <div className={classes.controls}>
          {mode != "edit" ? (
            <>
              <Button onClick={publicVersion}>Publikuj wersję</Button>
              <Button onClick={() => setMode("edit")}>Edytuj</Button>
              <Button>Usuń</Button>
            </>
          ) : (
            <>
              <Button onClick={handleViewVersion}>Podgląd wersji</Button>
              <Button onClick={handleReset}>Anuluj</Button>
              <Button>Usuń</Button>
            </>
          )}
        </div>
        <Divider>Oferta</Divider>
        <Offer service={location} mode={mode} />
        <Divider textAlign="right">Galeria</Divider>
        <Gallery />
        <Divider>Kontakt</Divider>
        <Contact service={location} mode={mode} />
      </Container>
    </div>
  );
}
