import React, { useContext } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import startCompanies from "../../public/img/startCompanies.jpg";
import Logo from "../Logo";
import { flexbox } from "@mui/system";
import { MenuItem, TextField, Theme, Typography } from "@mui/material";
import { ROUTES } from "../../config/configNav";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import DecorationTypography from "../DecorationTypography";
import { Service } from "../../config/types";
import { ServiceContext } from "./ServiceContext";
import { getValueFromExpenseCategory } from "../../config/helpers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import Link from "next/link";
import UploadImage from "../UploadFiles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    img: {
      position: "relative",
      height: "70vh",
      width: "100%",
      backgroundColor: theme.palette.primary.main,
    },
    banner: {
      position: "relative",
      height: "80vh",
      minHeight: "500px",
      width: "100%",
    },
    content: {
      position: "absolute",
      zIndex: 2,
      minHeight: "350px",
      minWidth: "500px",
      top: theme.spacing(15),
      left: theme.spacing(10),
      padding: theme.spacing(5),
      backgroundColor: "rgba(255,255,255,0.95)",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      border: "solid thin " + theme.palette.primary.main,
      fontWeight: "normal",
    },
    link: {
      textDecoration: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "& :hover": {
        color: theme.palette.primary.main,
      },
    },
    spacing: {
      margin: theme.spacing(0, 2),
    },
    inline: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0.5, 0),
    },
    upload: {
      position: "absolute",
      zIndex: 2,
      top: theme.spacing(15),
      right: theme.spacing(10),
      margin: theme.spacing(0, 2),
      backgroundColor: "rgba(255,255,255,0.95)",
      boxShadow: "rgba(0, 0, 0, 0.26) 0px 1px 5px",
      padding: theme.spacing(3),
    },
  })
);

export default function Banner() {
  const classes = useStyles();

  const { mode, currentService, categories, setService, setProfileImg } =
    useContext(ServiceContext);
  const router = useRouter();

  return (
    <div className={classes.banner}>
      <div className={classes.content}>
        {mode == "edit" ? (
          <Typography variant="h5" color="primary">
            Kategoria
            <TextField
              id="category"
              name="category"
              size="small"
              select
              className={classes.spacing}
              value={currentService?.category?.toString()}
              onChange={(e) =>
                setService({
                  ...currentService,
                  category: parseInt(e.target.value),
                })
              }
            >
              {(categories || []).map((e, i) => (
                <MenuItem key={i} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
        ) : (
          <a onClick={() => router.back()} className={classes.link}>
            <ArrowBackIosIcon />
            <Typography variant="h5" color="primary">
              {`Kategoria: ${getValueFromExpenseCategory(
                categories || [],
                currentService?.category
              )} `}
            </Typography>
          </a>
        )}
        {mode == "edit" ? (
          <TextField
            id="name"
            name="name"
            inputProps={{ style: { fontSize: "2rem", maxHeight: "1rem" } }}
            InputLabelProps={{ style: { fontSize: "2rem", maxHeight: "1rem" } }}
            value={currentService?.name || ""}
            onChange={(e) =>
              setService({ ...currentService, name: e.target.value })
            }
            sx={{ paddingTop: "5px" }}
          />
        ) : (
          <Typography variant="h3" color="primary">
            {currentService?.name || ""}
          </Typography>
        )}
        <br />
        <Typography variant="h6" color="GrayText">
          {mode == "edit" ? "Główny kontakt" : "Kontakt"}
        </Typography>
        {(mode === "edit" || currentService?.contact?.email) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Email:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="email"
                name="email"
                type="email"
                size="small"
                className={classes.spacing}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                value={currentService?.contact?.email || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    contact: {
                      ...currentService?.contact,
                      email: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.contact?.email}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.contact?.phone) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Telefon:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="phone"
                name="phone"
                size="small"
                className={classes.spacing}
                value={currentService?.contact?.phone || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    contact: {
                      ...currentService?.contact,
                      phone: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.contact?.phone}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.contact?.url) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Strona:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="website"
                name="website"
                size="small"
                className={classes.spacing}
                value={currentService?.contact?.url || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    contact: {
                      ...currentService?.contact,
                      url: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography
                color="primary"
                className={classes.spacing}
                component="a"
                href={"https://" + currentService?.contact?.url}
                target="_blank"
              >
                {currentService?.contact?.url}
              </Typography>
            )}
          </div>
        )}
      </div>
      {mode == "edit" && (
        <div className={classes.upload}>
          Zmień zdjęcie
          <UploadImage
            onImageChange={(url, file) => {
              setService({ ...currentService, fileLink: url });
              setProfileImg(file);
            }}
          />
        </div>
      )}
      <div className={classes.img}>
        {currentService?.fileLink && (
          <Image
            src={currentService?.fileLink}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </div>
  );
}
