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
import {
  ExpenseCategory,
  Service,
  ServiceStatusType,
} from "../../config/types";
import Offer from "./Offer";
import Gallery from "./Gallery";
import Contact from "./Contact";
import useSWR from "swr";
import axios from "axios";
import request from "../../config/requests";
import { ServiceContext } from "./ServiceContext";

const location = {
  id: 1,
  fileLink:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
  status: "Wersja robocza" as ServiceStatusType,
  name: "Nowa usługa",
  category: 1,
  styledDetails:
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
  const { id } = router.query;
  const [mode, setMode] = useState<"edit" | "view">(
    id === "new" ? "edit" : "view"
  );

  const [currentService, setCurrentService] = useState<Service>(location);

  const handleReset = () => {
    //cofnij zmiany
    setMode("view");
    setCurrentService(location);
  };

  const handleViewVersion = () => {
    //aktualizuj zmiany
    setMode("view");
  };

  const publicVersion = () => {
    //send to verification
  };

  const { data: categories } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };
  console.log(categories);
  return (
    <ServiceContext.Provider
      value={{
        categories: categories || [],
        currentService: currentService,
        mode: mode,
        setService: setCurrentService,
      }}
    >
      <div>
        <Banner />
        <Container>
          <div className={classes.controls}>
            {mode != "edit" ? (
              <>
                <Button onClick={publicVersion}>Zapisz wersję</Button>
                <Button onClick={() => setMode("edit")}>Edytuj</Button>
                <Button>Publikuj wersję</Button>
              </>
            ) : (
              <>
                <Button onClick={handleViewVersion}>Podgląd wersji</Button>
                <Button onClick={handleReset}>Cofnij zmiany</Button>
                <Button>Usuń</Button>
              </>
            )}
          </div>
          <Divider>Oferta</Divider>
          <Offer />
          {(mode === "edit" || currentService?.images) && (
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
