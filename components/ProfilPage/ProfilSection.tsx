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

export default function ProfilSection() {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: profilSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container component="section">
      <Divider>Profil</Divider>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.fullWidth}>
          <div className={classes.fields}>
            <div className={classes.media}>
              {image ? (
                <Image
                  className={classes.media}
                  src={image}
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
            <UploadImage onImageChange={setImage} />
          </div>
          <div className={classes.fields}>
            <TextField
              id="role"
              select
              name="role"
              size="small"
              label=""
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              {roleOptions.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
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
              id="password"
              name="password"
              label="Hasło"
              size="small"
              type="password"
              disabled
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <TextField
              id="name"
              name="name"
              size="small"
              label="Imię"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextField
              id="surname"
              name="surname"
              label="Nazwisko"
              size="small"
              value={formik.values.password}
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