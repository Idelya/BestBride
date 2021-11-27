import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Autocomplete,
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
import RectangularButton from "../RectangularButton";
import UploadImage from "../UploadFiles";
import {
  initialValues,
  weddingSchemaValidation,
} from "../../schema/WeddingDataSchema";
import { Diet, Guest, Wedding, Option } from "../../config/types";
import { isEqual } from "lodash";
import axios from "axios";
import { store } from "react-notifications-component";
import GuestAdd from "../GuestListPage/GuestAdd";
import useSWR from "swr";
import request from "../../config/requests";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textAlign: "center",
      margin: theme.spacing(2),
      textTransform: "none",
      width: "min-content",
    },
    form: {
      width: "fit-content",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      marginTop: theme.spacing(5),
      "& >*": {
        margin: theme.spacing(2),
      },
    },
    spacing: {
      margin: theme.spacing(0, 1),
    },
    btnAdd: {
      "& :hover": {
        color: theme.palette.primary.main,
      },
      textTransform: "none",
    },
  })
);

const fetcher = (url: string) => request.get(url).then((res) => res.data);

export default function WeddingSection({
  wedding,
  mutate,
  guests,
  mutateGuests,
}: {
  wedding: Wedding;
  mutate: () => void;
  guests: Guest[];
  mutateGuests: () => void;
}) {
  const { data: dietsOptions } = useSWR("api/diet", fetcher) as {
    data: Diet[];
  };
  const { data: genderOptions } = useSWR("api/gender", fetcher) as {
    data: Option[];
  };

  const { data: statusOptions } = useSWR("api/guestStatus", fetcher) as {
    data: Option[];
  };
  const classes = useStyles();
  const [value, setValue] = useState<Date | null>(
    //@ts-ignore
    wedding.date || new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const witnesses = guests.filter((e) => e.isWitness);
  const [witness1, setWitness1] = useState<number | null>(
    witnesses.length > 0 ? witnesses[0].id : null
  );
  const [witness2, setWitness2] = useState<number | null>(
    witnesses.length > 1 ? witnesses[1].id : null
  );

  useEffect(() => {
    setWitness1(witness1);
  }, [witness1]);
  useEffect(() => {
    setWitness2(witness2);
  }, [witness2]);

  const [addGuest, setAddGuest] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { ...initialValues, ...wedding },
    validationSchema: weddingSchemaValidation,
    onSubmit: async (values) => {
      try {
        const x = await axios.put("/api/weddingEdit/" + wedding.id, {
          ...values,
          date: value,
        });
        if (witness1 !== (witnesses.length > 0 ? witnesses[0].id : null)) {
          if (witnesses.length > 0) {
            await axios.put("/api/guestEdit/" + witnesses[0].id, {
              ...witnesses[0],
              isWitness: false,
            });
          }
          if (witness1) {
            await axios.put("/api/guestEdit/" + witness1, {
              ...guests.find((g) => g.id === witness1),
              isWitness: true,
            });
          }
        }
        if (witness2 !== (witnesses.length > 1 ? witnesses[1].id : null)) {
          if (witnesses.length > 1) {
            await axios.put("/api/guestEdit/" + witnesses[1].id, {
              ...witnesses[1],
              isWitness: false,
            });
          }
          if (witness2) {
            await axios.put("/api/guestEdit/" + witness2, {
              ...guests.find((g) => g.id === witness2),
              isWitness: true,
            });
          }
        }
        if (x.data) {
          store.addNotification({
            title: "Success",
            message: "Edytowano dane ślubu.",
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
          mutate();
          mutateGuests();
        } else {
          store.addNotification({
            title: "Bląd",
            message: "Spróbuj ponownie później",
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
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Container component="section" id="weddingSettings">
      <Divider textAlign="right">Dane ślubu</Divider>
      <GuestAdd
        open={addGuest}
        handleClose={() => {
          setAddGuest(false);
          mutateGuests();
        }}
        guests={guests}
        genderOptions={genderOptions}
        dietsOptions={dietsOptions}
        statusOptions={statusOptions}
      />
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField id="weddingDate" name="weddingDate" {...props} />
            )}
            label="Data ślubu"
            value={value}
            onChange={(newValue: Date | null) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          id="children"
          name="children"
          size="small"
          label="Budżet"
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          value={formik.values.budget}
          onChange={formik.handleChange}
          error={formik.touched.budget && Boolean(formik.errors.budget)}
          helperText={formik.touched.budget && formik.errors.budget}
        />
        <TextField
          id="plannedGuestAmmount"
          name="plannedGuestAmmount"
          size="small"
          label="Planowana liczba gości"
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          value={formik.values.plannedGuestAmmount}
          onChange={formik.handleChange}
          error={
            formik.touched.plannedGuestAmmount &&
            Boolean(formik.errors.plannedGuestAmmount)
          }
          helperText={
            formik.touched.plannedGuestAmmount &&
            formik.errors.plannedGuestAmmount
          }
        />
        <Autocomplete
          options={guests.filter((g) => g.id !== witness2)}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField name="witness1" label="Świadek 1" {...params} />
          )}
          value={guests.find((g) => g.id === witness1)}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => setWitness1(value?.id || null)}
        />
        <Autocomplete
          options={guests.filter((g) => g.id !== witness1)}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField name="witness2" label="Świadek 2" {...params} />
          )}
          value={guests.find((g) => g.id === witness2)}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => setWitness2(value?.id || null)}
        />
        <Button className={classes.btnAdd} onClick={() => setAddGuest(true)}>
          <Typography color="GrayText" variant="body2">
            Dodaj gościa
          </Typography>
        </Button>
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
