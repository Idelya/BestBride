import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { Form, useFormik } from "formik";
import {
  expenseSchemaValidation,
  initialValues,
} from "../../schema/ExpenseSchema";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { OPTIONS_STATUS } from "../../config/types";
import axios from "axios";
import { store } from "react-notifications-component";
import { ExpenseContext } from "./ExpenseContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    inline: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      margin: theme.spacing(2, 0),
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: "150px",
    },
  })
);

interface ExpenseAddProps {
  open: boolean;
  handleClose: () => void;
  update: () => void;
}
export default function ExpenseAdd({
  open,
  handleClose,
  update,
}: ExpenseAddProps) {
  const classes = useStyles();
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const { expenseOptions } = useContext(ExpenseContext);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: expenseSchemaValidation,
    onSubmit: async (values) => {
      const data = !deadline ? values : { ...values, finalDate: deadline };
      const dataWithDates = !paymentDate
        ? data
        : { ...data, paymentDate: paymentDate };
      try {
        const x = await axios.post("/api/expenseAdd", dataWithDates);
        if (x.data) {
          store.addNotification({
            title: "Success",
            message: "Dodano nowy wydatek.",
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
          update();
          handleClose();
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
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Divider component="p" variant="h5" textMargin="64px">
          Dodawanie wydatku
        </Divider>
        <Grid container>
          <Grid item xs={12} md={6} pr={8}>
            <div className={classes.inline}>
              <Typography component="label" variant="h6">
                Nazwa:
              </Typography>
              <TextField
                id="name"
                name="name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Cena:</Typography>
              <TextField
                id="price"
                name="price"
                size="small"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Opłacono:</Typography>
              <TextField
                id="paid"
                name="paid"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 0, max: formik.values.price },
                }}
                value={formik.values.paid}
                onChange={formik.handleChange}
                error={formik.touched.paid && Boolean(formik.errors.paid)}
                helperText={formik.touched.paid && formik.errors.paid}
              />
            </div>
            <div className={classes.inline}>
              <Typography
                color={status !== "opłacone" ? "lightgray" : "primary"}
                variant="h6"
              >
                Data zapłaty:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField id="paymentDate" name="paymentDate" {...props} />
                  )}
                  value={paymentDate}
                  disabled={formik.values.paid < formik.values.price}
                  onChange={(newValue: Date | null) => {
                    setPaymentDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Ostateczny termin zapłaty:</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField id="finalDate" name="finalDate" {...props} />
                  )}
                  value={deadline}
                  onChange={(newValue: Date | null) => {
                    setDeadline(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item xs={12} md={6} pr={8} pl={8}>
            <div className={classes.inline}>
              <Typography component="label" variant="h6">
                Kategoria:
              </Typography>
              <TextField
                id="type"
                name="type"
                size="small"
                value={formik.values.expensesCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.expensesCategory &&
                  Boolean(formik.errors.expensesCategory)
                }
                helperText={
                  formik.touched.expensesCategory &&
                  formik.errors.expensesCategory
                }
              >
                {(expenseOptions || []).map((e, i) => (
                  <MenuItem key={i} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Zadanie:</Typography>
              <Autocomplete
                id="toDoe"
                options={[]}
                onChange={formik.handleChange}
                includeInputInList
                renderInput={(params) => (
                  <TextField {...params} name="toDo" variant="outlined" />
                )}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <div className={classes.block}>
              <Typography variant="h6">Uwagi:</Typography>
              <TextField
                id="additionalInfo"
                name="additionalInfo"
                size="small"
                type="text"
                fullWidth
                rows={3}
                value={formik.values.additionalInfo}
                onChange={formik.handleChange}
                error={
                  formik.touched.additionalInfo &&
                  Boolean(formik.errors.additionalInfo)
                }
                helperText={
                  formik.touched.additionalInfo && formik.errors.additionalInfo
                }
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            textTransform: "none",
            margin: "8px",
          }}
        >
          <Button
            type="submit"
            sx={{
              textTransform: "none",
            }}
          >
            Zapisz
          </Button>
        </Grid>
      </form>
    </Modal>
  );
}
