import React, { useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Button,
  Container,
  Link,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { ROUTES } from "../../config/configNav";
import SignInForm from "../SignInForm";
import Divider from "../Divider";
import { useFormik } from "formik";
import {
  initialValues,
  profilSchemaValidation,
  roleOptions,
} from "../../schema/ProfilSchema";
import { flexbox } from "@mui/system";
import RectangularButton from "../RectangularButton";
import UploadImage from "../UploadFiles";
import SETTINGS from "../../config/settings";
import axios from "axios";
import { useSelector } from "react-redux";
import { User, Option } from "../../config/types";
import request from "../../config/requests";
import useSWR from "swr";
import FullLoading from "../FullLoading";
import { omit } from "lodash";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    fields: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(5, 7, 0),
      "& >*": {
        margin: theme.spacing(2),
      },
    },
    button: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
      width: "min-content",
    },
    media: {
      height: "400px",
      width: "350px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      "& > div": {
        width: "100%",
      },
    },
    fullWidth: {
      display: "flex",
      justifyContent: "space-around",
    },
  })
);

export default function ProfilSection({
  me,
  genderOptions,
}: {
  me: User;
  genderOptions: Option[];
}) {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: omit(me, ["id", "role"]),
    onSubmit: async (values) => {
      try {
        let url = "";
        if (!!file) {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", SETTINGS.upload_preset || "");
          data.append("cloud_name", SETTINGS.cloud_name || "");
          await fetch(SETTINGS.cloud_link || "", { method: "post", body: data })
            .then((resp) => resp.json())
            .then((data) => {
              setImage(data.secure_url);
              url = data.secure_url;
            })
            .catch((err) => console.log(err));
        }
        const x = await axios.put(
          "/api/userEdit/" + me.id,
          url ? { ...values, photo: url } : values
        );

        store.addNotification({
          title: "Success",
          message: "Profil edytowano.",
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
      } catch (error) {
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
      }
    },
  });

  if (!genderOptions) {
    return <FullLoading />;
  }
  return (
    <Container component="section" id="profil">
      <Divider>Profil</Divider>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.fullWidth}>
          <div className={classes.fields}>
            <div className={classes.media}>
              {image || me.photo ? (
                <Image
                  className={classes.media}
                  //@ts-ignore
                  src={image || me.photo}
                  alt="profile_img"
                  layout="responsive"
                  width={350}
                  height={400}
                  objectFit="cover"
                />
              ) : (
                <AccountBoxIcon sx={{ color: "#C0C0C0" }} fontSize="large" />
              )}
            </div>
            <UploadImage
              onImageChange={(url, file) => {
                setImage(url);
                setFile(file);
              }}
            />
          </div>
          <div className={classes.fields}>
            <TextField
              id="gender"
              select
              name="gender"
              size="small"
              label=""
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {genderOptions.map((e, i) => (
                <MenuItem key={i} value={e.key}>
                  {e.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="email"
              name="email"
              size="small"
              label="Email"
              disabled
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="name"
              name="name"
              size="small"
              label="Imię i nazwisko"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <RectangularButton
          color="primary"
          variant="outlined"
          size="medium"
          type="submit"
          className={classes.button}
        >
          Zapisz
        </RectangularButton>
      </form>
    </Container>
  );
}
