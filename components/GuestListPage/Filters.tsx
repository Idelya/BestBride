import React, { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Theme,
  Typography,
  Collapse,
  Button,
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Grid,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Search from "../Search";
import { Group, Guest } from "../../config/types";
import { Field, Formik, useFormik, useFormikContext } from "formik";
import { groupBy, uniq } from "lodash";
import { GuestContext } from "./GuestContext";
import { getValueFromDiet, getValue } from "../../config/helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandButton: {
      transform: "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expanded: {
      transform: "rotate(0deg)",
    },
    btn: {
      textTransform: "none",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    filters: {},

    block: {
      marginBottom: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      "& >*": {
        marginBottom: theme.spacing(1),
      },
    },

    inline: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      margin: theme.spacing(2, 0),
    },
  })
);

interface ValuesTypes {
  city: string[];
  status: number[];
  diet: number[];
  accommodation: boolean;
  transport: boolean;
}

export default function Filters({
  guests,
  handleChangeFilter,
  handleChangeSearch,
  filtredGuests,
}: {
  handleChangeFilter: (guests: Group[]) => void;
  handleChangeSearch: (guests: Group[]) => void;
  guests: Group[];
  filtredGuests: Group[];
}) {
  const classes = useStyles();
  console.log(guests, filtredGuests);

  const { genderOptions, dietsOptions, statusOptions } =
    useContext(GuestContext);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmitFilters = (values: ValuesTypes) => {
    console.log(values.status);
    const filtr = guests
      .map((groups) => {
        return {
          name: groups.name,
          guests: groups.guests
            ?.filter(
              (guest) =>
                values.city.length === 0 ||
                values.city.includes(guest.city || "")
            )
            .filter(
              (guest) =>
                values.status.length === 0 ||
                values.status.includes(guest.status)
            )
            .filter(
              (guest) =>
                values.diet.length === 0 || values.diet.includes(guest.diet)
            )
            .filter((guest) => !values.accommodation || guest.accommodation)
            .filter((guest) => !values.transport || guest.transport),
        };
      })
      .filter((group) => group.guests.length != 0);
    handleChangeFilter(filtr);
  };

  if (!guests || !genderOptions || !dietsOptions || !statusOptions) return null;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disableRipple
          onClick={handleExpandClick}
          className={classes.btn}
        >
          <Typography>Filtry</Typography>
          <ExpandMoreIcon
            className={
              classes.expandButton + " " + (expanded && classes.expanded)
            }
          />
        </Button>
        <Search handleChange={handleChangeSearch} list={filtredGuests} />
      </Box>
      <Collapse in={expanded} timeout="auto">
        <Formik
          initialValues={{
            city: [],
            status: [],
            diet: [],
            accommodation: false,
            transport: false,
          }}
          onSubmit={handleSubmitFilters}
        >
          {({ values, setFieldValue, handleChange, handleSubmit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Grid container className={classes.filters} spacing={5}>
                <Grid item md={6}>
                  <div className={classes.block}>
                    <Typography color="GrayText">Miasta:</Typography>
                    <Select
                      name="city"
                      id="city"
                      size="small"
                      multiple
                      fullWidth
                      onChange={(e) => setFieldValue("city", e.target.value)}
                      value={values.city}
                      renderValue={(selected) => {
                        return selected.length > 0
                          ? selected
                              .map((select) => select || "Bez miasta")
                              .join(", ")
                          : "Wybierz miasto";
                      }}
                    >
                      {uniq(
                        guests
                          .map((group) => group.guests)
                          .flat()
                          .map((e) => e.city)
                      ).map((e, i) => (
                        <MenuItem key={i} value={e}>
                          {e || "Bez miasta"}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className={classes.block}>
                    <Typography color="GrayText">Diety:</Typography>
                    <Select
                      name="diet"
                      id="diet"
                      size="small"
                      multiple
                      fullWidth
                      onChange={(e) => setFieldValue("diet", e.target.value)}
                      value={values.diet}
                      renderValue={(selected) =>
                        selected
                          ? selected
                              .map((select) =>
                                getValueFromDiet(dietsOptions, select)
                              )
                              .join(", ")
                          : "Wybierz dietę"
                      }
                    >
                      {dietsOptions.map((e, i) => (
                        <MenuItem key={i} value={e.id}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>

                    <div className={classes.block}>
                      <Typography color="GrayText">
                        Status zaproszenia:
                      </Typography>
                      <Select
                        name="status"
                        id="status"
                        size="small"
                        multiple
                        fullWidth
                        onChange={(e) =>
                          setFieldValue("status", e.target.value)
                        }
                        value={values.status}
                        renderValue={(selected) =>
                          selected
                            ? selected
                                .map((select: number | undefined) =>
                                  getValue(statusOptions, select)
                                )
                                .join(", ")
                            : "Wybierz status"
                        }
                      >
                        {statusOptions.map((e, i) => (
                          <MenuItem key={i} value={e.key}>
                            {e.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className={classes.inline}>
                    <Typography color="GrayText">Tylko z noclegiem:</Typography>
                    <Checkbox
                      id="accommodation"
                      name="accommodation"
                      value={values.accommodation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={classes.inline}>
                    <Typography color="GrayText">Tylko z dojazdem:</Typography>
                    <Checkbox
                      id="transport"
                      name="transport"
                      value={values.transport}
                      onChange={handleChange}
                    />
                  </div>
                </Grid>
                <Grid xs={12} className={classes.inline}>
                  <Button
                    type="submit"
                    sx={{
                      textTransform: "none",
                      margin: "auto",
                    }}
                  >
                    Zatwierdź
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Collapse>
    </Box>
  );
}
