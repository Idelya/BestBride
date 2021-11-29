import React, { useContext, useState } from "react";
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
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { Service } from "../../config/types";
import { Map, Marker, Draggable, ZoomControl } from "pigeon-maps";
import { ServiceContext } from "./ServiceContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(5, 0),
      "& .image-gallery-thumbnail.active": {
        borderColor: theme.palette.primary.main,
      },
      "& .image-gallery-thumbnail:hover": {
        borderColor: theme.palette.primary.main,
      },
      "& .image-gallery-icon:hover": {
        color: theme.palette.primary.main,
      },
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
  })
);
export default function Contact() {
  const classes = useStyles();
  const { mode, currentService, categories, setService } =
    useContext(ServiceContext);
  return (
    <Grid container className={classes.container}>
      <Grid item md={6}>
        {(mode === "edit" || currentService?.email) && (
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
                value={currentService?.email || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.email}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.phone) && (
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
                value={currentService?.phone || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    phone: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.phone}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.url) && (
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
                value={currentService?.url || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    url: e.target.value,
                  })
                }
              />
            ) : (
              <Typography
                color="primary"
                className={classes.spacing}
                component="a"
                href={"https://" + currentService?.url}
                target="_blank"
              >
                {currentService?.url}
              </Typography>
            )}
          </div>
        )}

        {(mode === "edit" || currentService?.contactDetails) && (
          <div>
            <Typography variant="subtitle1" color="GrayText">
              Dodatkowe informacje:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="contactDetails"
                name="contactDetails"
                multiline
                rows={4}
                fullWidth
                value={currentService?.contactDetails || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    contactDetails: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.contactDetails}
              </Typography>
            )}
          </div>
        )}
      </Grid>
      <Grid item md={6}>
        {(mode === "edit" || currentService?.street) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Ulica:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="street"
                name="street"
                size="small"
                className={classes.spacing}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                value={currentService?.street || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    street: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.street}
              </Typography>
            )}
          </div>
        )}

        {(mode === "edit" || currentService?.streetNumber) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Numer mieszkania:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="streetNumber"
                name="streetNumber"
                size="small"
                className={classes.spacing}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                value={currentService?.streetNumber || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    streetNumber: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.streetNumber}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.city) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Miasto:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="city"
                name="city"
                size="small"
                className={classes.spacing}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                value={currentService?.city || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    city: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.city}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.region) && (
          <div className={classes.inline}>
            <Typography variant="subtitle1" color="GrayText">
              Region:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="region"
                name="region"
                size="small"
                className={classes.spacing}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                value={currentService?.region || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    region: e.target.value,
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.region}
              </Typography>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
}
