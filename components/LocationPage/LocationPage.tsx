import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import MessageIcon from "@mui/icons-material/Message";
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
  IconButton,
  Modal,
  Theme,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { number } from "yup";
import { useRouter } from "next/router";
import Banner from "./Banner";
import { ExpenseCategory, Service, Option } from "../../config/types";
import Offer from "./Offer";
import Gallery from "./Gallery";
import Contact from "./Contact";
import useSWR from "swr";
import axios from "axios";
import request from "../../config/requests";
import { ServiceContext } from "./ServiceContext";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Loading from "../Loading";
import { store } from "react-notifications-component";
import { blockToText, getValue } from "../../utils/helpers";
import { schema } from "../../schema/ServiceSchema";
import SETTINGS from "../../config/settings";
import { isEqual, omit } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
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
    main: {
      width: "80vw",
      backgroundColor: theme.palette.background.default,
      border: "solid thin " + theme.palette.primary.main,
      margin: "auto",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -30%)",
      padding: theme.spacing(0, 5, 5),
      borderRadius: theme.spacing(5),
      minHeight: "50vh",
    },
  })
);

const fetcher = (url: string) => request.get(url).then((res) => res.data);
const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);
export default function LocationPage() {
  const classes = useStyles();
  const router = useRouter();
  const [currentService, setCurrentService] = useState<Service>();
  const [gallery, setGallery] = useState<File[]>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loader, setLoader] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const { id } = router.query;
  const [mode, setMode] = useState<"edit" | "view">(
    id === "new" ? "edit" : "view"
  );

  const { data, mutate } = useSWR("api/service/" + id, fetcher) as {
    data: Service;
    mutate: () => void;
  };
  console.log(currentService);
  const { data: isOwnerCheck } = useSWR("/api/isOwner/" + id, fetcherAuth) as {
    data: { isMyService: boolean };
  };

  const handleDelete = async () => {
    if (!currentService) return;
    try {
      const x = await axios.delete("/api/serviceDel/" + currentService.id);
      if (x.data) {
        await router.push("/companies-locations-list");
        store.addNotification({
          title: "Success",
          message:
            "Usunieto usługę. Jeżeli nie posiadasz żadnej zweryfikowanej wersji sklepu, strona będzie nadal widoczna ze statusem usunięta.",
          type: "success",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Bląd",
          message: "Spróbuj ponownie później",
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditService = async () => {
    try {
      setLoader(true);
      const service = {
        ...data,
        ...currentService,
        details: blockToText(convertToRaw(editorState.getCurrentContent())),
        detailsStyle: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        ),
        mode: 1,
      };

      let urlToProfile;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", SETTINGS.upload_preset || "");
        data.append("cloud_name", SETTINGS.cloud_name || "");
        await fetch(SETTINGS.cloud_link || "", { method: "post", body: data })
          .then((resp) => resp.json())
          .then((data) => {
            urlToProfile = data.secure_url;
          })
          .catch((err) => console.log(err));
      }
      /*
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
              const imgLink = data.secure_url;
              galleryLinks.push(imgLink);
            });
        });
        await Promise.all(uploaders);
      }
      */
      const { id, version, images, status, ...editedService } = service;
      const x = await axios.post(
        "/api/serviceAdd",
        urlToProfile
          ? {
              ...editedService,
              fileLink: urlToProfile,
              //galleryFile: galleryLinks.join(";"),
            }
          : {
              ...editedService,
              //galleryFile: galleryLinks.join(";"),
            }
      );
      mutate();
      store.addNotification({
        title: "Sukces",
        //@ts-ignore
        message: "Edytowano usługę.",
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
    } catch (postErr) {
      store.addNotification({
        title: "Błąd",
        message: "Zapis nie powiódł się. Proszę spróbować później.",
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

  useEffect(() => {
    if (!data) return;
    setCurrentService({
      ...data,
      images: data?.galleryFile?.split(";"),
    });

    if (data.detailsStyle) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(data.detailsStyle))
        )
      );
    }
  }, [id, data]);

  const [file, setFile] = useState<File>();
  const handleReset = () => {
    setMode("view");
    setCurrentService({
      ...data,
      images: data?.galleryFile?.split(";"),
    });
  };

  const handleViewVersion = () => {
    setMode("view");
  };

  const publicVersion = async () => {
    if (!isEqual(omit(currentService, ["images"]), data)) {
      store.addNotification({
        title: "Uwaga",
        //@ts-ignore
        message: "Przed przesłaniem do weryfikacji zapisz stronę.",
        type: "info",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    try {
      await schema.validate(data);
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
      return;
    }
    try {
      const x = await axios.put("/api/serviceToVerify/" + id);
      await router.push("/companies-locations-list");
      store.addNotification({
        title: "Sukces",
        //@ts-ignore
        message: "Usługa została przesłana do weryfikacji administratora.",
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
    } catch (postErr) {
      store.addNotification({
        title: "Błąd",
        //@ts-ignore
        message: "Przepraszamy. Nie można przesłac strony do weryfikacji",
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
    }
  };

  const { data: categories } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };

  const { data: statusOptions } = useSWR("api/servicestatus", fetcher) as {
    data: Option[];
  };
  if (!data || !isOwnerCheck || loader) {
    return (
      <Container className={classes.container}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Loading />
        </Box>
      </Container>
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
        <Modal open={rejectModal} onClose={() => setRejectModal(false)}>
          <Box className={classes.main}>
            <Divider textAlign="center">Powód odrzucenia</Divider>
            <Typography>{data.rejectionDetails}</Typography>
          </Box>
        </Modal>
        <Banner />
        <Container>
          {isOwnerCheck?.isMyService && (
            <div className={classes.controls}>
              <Box>
                <Typography>{getValue(statusOptions, data.status)}</Typography>
                {data.status === 3 && (
                  <IconButton
                    color="primary"
                    onClick={() => setRejectModal(true)}
                  >
                    <MessageIcon />
                  </IconButton>
                )}
              </Box>
              {mode != "edit" ? (
                <>
                  <Button onClick={handleEditService}>Zapisz wersję</Button>
                  <Button onClick={() => setMode("edit")}>Edytuj</Button>
                  <Button onClick={publicVersion}>Publikuj wersję</Button>
                </>
              ) : (
                <>
                  <Button onClick={handleViewVersion}>Podgląd wersji</Button>
                  <Button onClick={handleReset}>Cofnij zmiany</Button>
                  <Button onClick={handleDelete}>Usuń</Button>
                </>
              )}
            </div>
          )}
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
