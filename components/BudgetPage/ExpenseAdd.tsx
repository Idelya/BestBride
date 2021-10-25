import React, { useState } from "react";
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
}
export default function ExpenseAdd({ open, handleClose }: ExpenseAddProps) {
  const classes = useStyles();
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const [deadline, setDeadline] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>("zaplanowane");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: expenseSchemaValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
              <Typography variant="h6">Status:</Typography>
              <TextField
                id="status"
                select
                name="status"
                size="small"
                label=""
                value={status}
                defaultValue="zaplanowane"
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPaymentDate(null);
                }}
                className={classes.input}
              >
                {OPTIONS_STATUS.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                  disabled={status !== "opłacone"}
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
                Typ:
              </Typography>
              <TextField
                id="type"
                name="type"
                size="small"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Szacowana cena:</Typography>
              <TextField
                id="estiamtedPrice"
                name="estiamtedPrice"
                size="small"
                type="number"
                value={formik.values.estiamtedPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.estiamtedPrice &&
                  Boolean(formik.errors.estiamtedPrice)
                }
                helperText={
                  formik.touched.estiamtedPrice && formik.errors.estiamtedPrice
                }
              />
            </div>
            <div className={classes.inline}>
              <Typography component="label" variant="h6">
                Link do usługi:
              </Typography>
              <TextField
                id="service"
                name="service"
                size="small"
                value={formik.values.service}
                onChange={formik.handleChange}
                error={formik.touched.service && Boolean(formik.errors.service)}
                helperText={formik.touched.service && formik.errors.service}
              />
            </div>
            <div className={classes.inline}>
              <Typography variant="h6">Zadanie:</Typography>
              <TextField
                id="task"
                name="task"
                select
                value={formik.values.task}
                onChange={formik.handleChange}
              >
                {[].map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item md={12}>
            <div className={classes.block}>
              <Typography variant="h6">Uwagi:</Typography>
              <TextField
                id="remarks"
                name="remarks"
                size="small"
                type="text"
                fullWidth
                rows={3}
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={formik.touched.remarks && formik.errors.remarks}
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
