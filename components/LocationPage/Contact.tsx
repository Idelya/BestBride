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
import { Service, ServiceStatusType } from "../../config/types";
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

        {(mode === "edit" || currentService?.contact?.details) && (
          <div>
            <Typography variant="subtitle1" color="GrayText">
              Dodatkowe informacje:
            </Typography>
            {mode === "edit" ? (
              <TextField
                id="details"
                name="details"
                multiline
                rows={4}
                fullWidth
                value={currentService?.contact?.details || ""}
                inputProps={{ style: { padding: "3px 5px" } }}
                InputLabelProps={{ style: { padding: "3px 5px" } }}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    contact: {
                      ...currentService?.contact,
                      details: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.contact?.details}
              </Typography>
            )}
          </div>
        )}
      </Grid>
      <Grid item md={6}>
        {(mode === "edit" || currentService?.address?.street) && (
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
                value={currentService?.address?.street || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    address: {
                      ...currentService?.address,
                      street: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.address?.street}
              </Typography>
            )}
          </div>
        )}

        {(mode === "edit" || currentService?.address?.streetNumber) && (
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
                value={currentService?.address?.streetNumber || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    address: {
                      ...currentService?.address,
                      streetNumber: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.address?.streetNumber}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.address?.city) && (
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
                value={currentService?.address?.city || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    address: {
                      ...currentService?.address,
                      city: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.address?.city}
              </Typography>
            )}
          </div>
        )}
        {(mode === "edit" || currentService?.address?.region) && (
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
                value={currentService?.address?.region || ""}
                onChange={(e) =>
                  setService({
                    ...currentService,
                    address: {
                      ...currentService?.address,
                      region: e.target.value,
                    },
                  })
                }
              />
            ) : (
              <Typography color="primary" className={classes.spacing}>
                {currentService?.address?.region}
              </Typography>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
}
