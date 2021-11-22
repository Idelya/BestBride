import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import request from "../../config/requests";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { Service } from "../../config/types";
import { theme } from "../../utils/theme";
import Loading from "../Loading";
import { store } from "react-notifications-component";
import useToggle from "../../utils/useToggle";
import Divider from "../Divider";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  container: {
    marginTop: theme.spacing(10),
    minHeight: "100vh",
  },
  root: {
    textAlign: "center",
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
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  item: {
    border: "solid thin " + theme.palette.primary.main,
    margin: theme.spacing(2),
  },
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function AdminPanelPage() {
  const classes = useStyles();
  const { data: locations } = useSWR("/api/servicesToVerify", fetcher) as {
    data: Service[];
  };

  const [rejectModal, setRejectModal] = useState<number | null>(null);
  const [rejectMessage, setRejectMessage] = useState("");
  const router = useRouter();
  const redirectToLocationPage = async (id: number) => {
    await router.push(`services/${id}`);
  };
  const handleAccept = async (id: number) => {
    try {
      const x = await axios.put("/api/serviceAccept/" + id);
      store.addNotification({
        title: "Sukces",
        //@ts-ignore
        message: "Usługa została zaakceptowana.",
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
        message: "Przepraszamy. Nie można zaakceptować usługi.",
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

  const handleReject = async (id: number) => {
    try {
      const x = await axios.put("/api/serviceReject/" + id);
      store.addNotification({
        title: "Sukces",
        //@ts-ignore
        message: "Informacja została przekazana użytkownikowi.",
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
        message: "Przepraszamy. Nie można odrzucić usługi.",
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
      <Modal open={rejectModal !== null} onClose={() => setRejectModal(null)}>
        <Box className={classes.main}>
          <Divider textAlign="center">Powód odrzucenia strony</Divider>
          <Typography>
            Podaj zrozumiałą dla użytkownika wiadomość, dlaczego strona została
            odrzucona i jakie poprawki należy nanieść.
          </Typography>
          <TextField
            id="rejectMessage"
            name="rejectMessage"
            multiline
            rows={5}
            fullWidth
            value={rejectMessage}
            onChange={(e) => setRejectMessage(e.target.value)}
          />
          <Button onClick={() => handleReject(rejectModal || -1)}>
            Zatwierdź
          </Button>
        </Box>
      </Modal>
      <Divider textAlign="center">Prośby o publikację</Divider>
      <List>
        {locations.map((e) => {
          return (
            <ListItem key={e.id || -1} className={classes.item}>
              <ListItemText primary={`${e.name}`} />
              <Button onClick={() => setRejectModal(e.id || -1)}>Odrzuć</Button>
              <Button onClick={() => handleAccept(e.id || -1)}>Akceptuj</Button>
              <Button onClick={() => redirectToLocationPage(e.id || -1)}>
                Podgląd
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
