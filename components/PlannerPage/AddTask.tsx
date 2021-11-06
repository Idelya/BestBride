import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  List,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import Divider from "../Divider";
import { useFormik } from "formik";
import { store } from "react-notifications-component";
import request from "../../config/requests";
import {
  taskSchemaValidation,
  initialValues,
  taskStatusOptions,
} from "../../schema/TaskSchema";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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
  })
);

interface AddTaskProps {
  open: boolean;
  handleClose: () => void;
}
export default function AddTask({ open, handleClose }: AddTaskProps) {
  const classes = useStyles();
  const [value, setValue] = useState<Date | null>(new Date());

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchemaValidation,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Divider variant="h5">Dodawanie zadania</Divider>
        <Grid container>
          <Grid item xs={12} md={7} pr={10}>
            <div className={classes.inline}>
              <Typography component="label" color="GrayText" variant="h6">
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
              <Typography color="GrayText" variant="h6">
                Status:
              </Typography>
              <TextField
                id="status"
                name="status"
                select
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                {taskStatusOptions.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Data:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField id="weddingDate" name="weddingDate" {...props} />
                  )}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.inline}>
              <Typography color="GrayText" variant="h6">
                Przypisano do:
              </Typography>
              <Autocomplete
                disablePortal
                id="assignedTo"
                size="small"
                options={[]}
                value={formik.values.assignedTo}
                renderInput={(params) => (
                  <TextField name="assignedTo" {...params} />
                )}
              />
            </div>
          </Grid>
          <Grid item md={5} pr={10}>
            <List>
              <Typography color="GrayText" variant="h6">
                Wydatki powiązane z zadaniem:
              </Typography>
              <Select
                id="expanses"
                name="expanses"
                multiple
                size="small"
                fullWidth
                value={formik.values.expanses}
                onChange={formik.handleChange}
                input={<OutlinedInput name="expanses" id="expanses" />}
              >
                {[].map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </List>
          </Grid>
          <Grid item md={12} pr={10}>
            <div className={classes.block}>
              <Typography color="GrayText" variant="h6">
                Uwagi:
              </Typography>
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
          <Grid
            item
            xs={12}
            md={12}
            m={2}
            sx={{ display: "flex", justifyContent: "center" }}
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
        </Grid>
      </form>
    </Modal>
  );
}
