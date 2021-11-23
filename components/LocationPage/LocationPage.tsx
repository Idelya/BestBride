import React, { useEffect, useState } from "react";
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
import { getValue } from "../../config/helpers";

const location = {
  id: 1,
  fileLink:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
  status: 0,
  name: "Nowa usługa",
  category: 1,
  detailsStyle:
    '{"blocks":[{"key":"444a","text":"Nagłówek","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1kga8","text":"Lorem ipsum dolor sit amet, mandamus iracundia quo an. No feugiat partiendo abhorreant nam. Cu sea dicant ornatus, his euismod inermis no. Ipsum assum ad vel. Mei ad perfecto inimicus scribentur, nihil appetere interpretaris te quo, ut ius quot ceteros delicatissimi. Mel vocent epicurei cu, ex est lorem menandri. Tation iudicabit at per, ad has case nemore phaedrum. Laoreet expetendis his id. Unum vulputate neglegentur an pri, no quo decore platonem.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ab3b6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e0h6n","text":"Et debet omnium usu, sit fuisset torquatos abhorreant ea, at dissentiet interpretaris his. Affert doming scribentur pri ut, usu at graeco fuisset probatus. An eros sonet delectus pro. Id mel sententiae reformidans. Qui ei reque praesent.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"abfoh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"540rm","text":"Lorem ipsum dolor sit amet, mandamus iracundia quo an. No feugiat partiendo abhorreant nam. Cu sea dicant ornatus, his euismod inermis no. Ipsum assum ad vel.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2h62n","text":"dfs","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dhqbl","text":"fdsf","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"co76m","text":"fd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8t5gu","text":"Mei ad perfecto inimicus scribentur, nihil appetere interpretaris te quo, ut ius quot ceteros delicatissimi. Mel vocent epicurei cu, ex est lorem menandri. Tation iudicabit at per, ad has case nemore phaedrum. Laoreet expetendis his id. Unum vulputate neglegentur an pri, no quo decore platonem.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c1i2s","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1n4uo","text":"Et debet omnium usu, sit fuisset torquatos abhorreant ea, at dissentiet interpretaris his. Affert doming scribentur pri ut, usu at graeco fuisset probatus. An eros sonet delectus pro. Id mel sententiae reformidans. Qui ei reque praesent.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fn6gq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
  images: [
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1015/1000/600/",
    "https://picsum.photos/id/1019/1000/600/",
  ],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
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
  })
);

const statusTocolor = ["#FDFFE6", "#E6FFFC", "#D4FFD7", "#FFE6E6", "#000000"];
const fetcher = (url: string) => request.get(url).then((res) => res.data);
const fetcherAuth = (url: string) => axios.get(url).then((res) => res.data);
export default function LocationPage() {
  const classes = useStyles();
  const router = useRouter();
  const [currentService, setCurrentService] = useState<Service>();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { id } = router.query;
  const [mode, setMode] = useState<"edit" | "view">(
    id === "new" ? "edit" : "view"
  );

  const { data } = useSWR("api/service/" + id, fetcher) as { data: Service };
  /*const { data: isOwner } = useSWR("api/isservice/" + id, fetcherAuth);*/
  useEffect(() => {
    if (!data) return;
    setCurrentService(data);

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
    setCurrentService(data);
  };

  const handleViewVersion = () => {
    setMode("view");
  };

  const publicVersion = async () => {
    if (currentService === location) {
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
      const x = await axios.put("/api/serviceToVerify/" + id);
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

  const handleDelete = () => {};

  const { data: categories } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };

  const { data: statusOptions } = useSWR("api/servicestatus", fetcher) as {
    data: Option[];
  };

  if (!data) {
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
        editorState: editorState,
        setEditorState: setEditorState,
        statusOptions: statusOptions,
      }}
    >
      <div>
        <Banner />
        <Container>
          <div className={classes.controls}>
            <Box sx={{ backgroundColor: statusTocolor[data.status || 0] }}>
              <Typography>{getValue(statusOptions, data.status)}</Typography>
            </Box>
            {mode != "edit" ? (
              <>
                <Button onClick={() => console.log("educja")}>
                  Zapisz wersję
                </Button>
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
