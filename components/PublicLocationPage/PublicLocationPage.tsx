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
import Banner from "../ServiceComponent/Banner";
import { ExpenseCategory, Service, Option } from "../../config/types";
import Offer from "../ServiceComponent/Offer";
import Gallery from "../ServiceComponent/Gallery";
import Contact from "../ServiceComponent/Contact";
import useSWR from "swr";
import axios from "axios";
import request from "../../config/requests";
import { ServiceContext } from "../ServiceComponent/ServiceContext";
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
export default function PublicLocationPage() {
  const classes = useStyles();
  const router = useRouter();
  const [currentService, setCurrentService] = useState<Service>();
  const [gallery, setGallery] = useState<File[]>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loader, setLoader] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const { id } = router.query;

  const { data, mutate } = useSWR("/api/serviceinnerkey/" + id, fetcher) as {
    data: Service;
    mutate: () => void;
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

  const { data: categories } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };

  const { data: statusOptions } = useSWR("api/servicestatus", fetcher) as {
    data: Option[];
  };
  if (!data || loader) {
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
        mode: "view",
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
          <Divider>Oferta</Divider>
          <Offer />
          {currentService?.images && currentService.images.length > 0 && (
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
