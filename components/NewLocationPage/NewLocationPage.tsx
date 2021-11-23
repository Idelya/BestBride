import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Box,
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
import { ExpenseCategory, Service, Option } from "../../config/types";
import useSWR from "swr";
import axios from "axios";
import request from "../../config/requests";
import { ServiceContext } from "../LocationPage/ServiceContext";
import Banner from "../LocationPage/Banner";
import Contact from "../LocationPage/Contact";
import Gallery from "../LocationPage/Gallery";
import Offer from "../LocationPage/Offer";
import { schema } from "../../schema/ServiceSchema";
import { store } from "react-notifications-component";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { blockToText } from "../../config/helpers";
import SETTINGS from "../../config/settings";
import Loading from "../Loading";

const location = {
  id: 1,
  fileLink: "",
  status: 0,
  name: "Nowa usługa",
  category: 1,
  details: "",
  detailsStyle: "",
  contact: {
    email: "",
    phone: "",
    url: "",
    details: "",
  },
  address: {
    country: "",
    city: "",
    region: "",
    street: "",
    streetNumber: "",
    streetNumber2: "",
  },
  images: [],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    controls: {
      zIndex: 5,
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

const fetcher = (url: string) => request.get(url).then((res) => res.data);
const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);
export default function LocationPage() {
  const classes = useStyles();
  const router = useRouter();
  const [mode, setMode] = useState<"edit" | "view">("edit");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentService, setCurrentService] = useState<Service>(location);
  const [loader, setLoader] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [gallery, setGallery] = useState<File[]>([]);

  const handleAddService = async () => {
    try {
      setLoader(true);
      const service = {
        ...currentService,
        details: blockToText(convertToRaw(editorState.getCurrentContent())),
        detailsStyle: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        ),
      };

      const { contact, address, ...formData } = service;

      await schema.validate(service);
      const threePack = {
        ...formData,
        ...contact,
        ...address,
        mode: 0,
      };
      let url;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", SETTINGS.upload_preset || "");
        data.append("cloud_name", SETTINGS.cloud_name || "");
        await fetch(SETTINGS.cloud_link || "", { method: "post", body: data })
          .then((resp) => resp.json())
          .then((data) => {
            url = data.url;
          })
          .catch((err) => console.log(err));
      }

      const galleryLinks: string[] = [];
      if (gallery.length > 0) {
        const uploaders = gallery.map((img) => {
          const galleryForm = new FormData();
          galleryForm.append("file", img);
          galleryForm.append("upload_preset", SETTINGS.upload_preset || "");
          galleryForm.append("cloud_name", SETTINGS.cloud_name || "");
          return fetch(SETTINGS.cloud_link || "", {
            method: "post",
            body: galleryForm,
          })
            .then((resp) => resp.json())
            .then((data) => {
              const imgLink = data.url;
              galleryLinks.push(imgLink);
            });
        });
        await Promise.all(uploaders);
      }
      try {
        const x = await axios.post(
          "/api/serviceAdd",
          url
            ? {
                ...threePack,
                fileLink: url,
                galleryFile: galleryLinks.join(";"),
              }
            : {
                ...threePack,
                galleryFile: galleryLinks.join(";"),
              }
        );
        await router.push("/companies-locations-list");
        store.addNotification({
          title: "Sukces",
          //@ts-ignore
          message:
            "Dodano usługę. Wybierz publikuj, jeżeli chcesz, aby ją udostepnić.",
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      } catch (postErr) {}
    } catch (err) {
      store.addNotification({
        title: "Bląd walidacji",
        //@ts-ignore
        message: err?.errors.join(" "),
        type: "danger",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } finally {
      setLoader(false);
    }
  };

  const handleViewVersion = () => {
    setMode("view");
  };

  const { data: categories } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };

  const { data: statusOptions } = useSWR("api/servicestatus", fetcher) as {
    data: Option[];
  };

  if (loader) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <ServiceContext.Provider
      value={{
        categories: categories || [],
        currentService: currentService,
        mode: mode,
        setService: setCurrentService,
        profileImg: file,
        setProfileImg: setFile,
        gallery: gallery,
        setGallery: setGallery,
        editorState: editorState,
        setEditorState: setEditorState,
        statusOptions: statusOptions,
      }}
    >
      <div>
        <Banner />
        <Container>
          <div className={classes.controls}>
            {mode != "edit" ? (
              <>
                <Button onClick={handleAddService}>Dodaj usługę</Button>
                <Button onClick={() => setMode("edit")}>Podgląd edycji</Button>
                <Button disabled>Publikuj</Button>
              </>
            ) : (
              <>
                <Button onClick={handleViewVersion}>Podgląd wersji</Button>
              </>
            )}
          </div>
          <Divider>Oferta</Divider>
          <Offer />
          {(mode === "edit" ||
            (currentService?.images && currentService.images.length > 0)) && (
            <>
              <Divider textAlign="right">Galeria</Divider>
              <Gallery />
            </>
          )}
          <Divider>Kontakt</Divider>
          <Contact />
        </Container>
      </div>
    </ServiceContext.Provider>
  );
}