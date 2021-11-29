import React, { useContext, useMemo, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
import { taskSchemaValidation, initialValues } from "../../schema/TaskSchema";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import { PlannerContext } from "./PlannerContext";
import useSWR from "swr";
import { Expense, Option, Phase, UserPlanner } from "../../config/types";

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

    list: {
      margin: theme.spacing(0, 1),
      height: "300px",
      overflowY: "auto",
      "& .scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "10px",
        backgroundColor: " #F5F5F5",
      },

      "&::-webkit-scrollbar": {
        width: "12px",
        backgroundColor: "#F5F5F5",
      },

      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: theme.palette.primary.main,
      },
    },
    select: {
      minWidth: "200px",
    },
    btn: {
      textDecoration: "none",
      margin: "5px auto",
    },
  })
);

interface AddTaskProps {
  open: boolean;
  handleClose: () => void;
  update: () => void;
  phase: Phase;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function AddTask({
  open,
  handleClose,
  update,
  phase,
}: AddTaskProps) {
  const { todoOptions, wedding, weddingUsers } = useContext(PlannerContext);
  const classes = useStyles();
  const [value, setValue] = useState<Date | null>(wedding?.date || new Date());
  const [user, setUser] = useState<UserPlanner | null>(null);

  const { data: expenses } = useSWR("api/expenses", fetcher) as {
    data: Expense[];
  };

  const [expenseInList, setExpenseInList] = useState<Expense[]>([]);
  const searchableExpenses = useMemo(
    () => (expenses || []).filter((o) => !expenseInList.includes(o)),
    [expenseInList, expenses]
  );

  const [searchedExpense, setSearchedExpense] = useState<Expense | null>(null);

  const [clear, setClear] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: taskSchemaValidation,
    onSubmit: async (values) => {
      const formData = !!user ? { ...values, assigned: user.id } : values;
      /*const taskWithExp =
        expenseInList.length > 0
          ? { ...formData, expenses: expenseInList.map((exp) => exp.id) }
          : formData;*/
      const taskWithExp = searchedExpense
        ? { ...formData, expense: searchedExpense.id }
        : formData;
      try {
        console.log({
          ...taskWithExp,
          order: 0,
          date: value,
          phaseId: phase.id,
        });
        const x = await axios.post("/api/taskAdd", {
          ...taskWithExp,
          order: 0,
          date: value,
          phaseId: phase.id,
        });
        if (x.data) {
          handleClose();
          update();
          store.addNotification({
            title: "Sukces",
            message: "Dodano nowe zadanie.",
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
  if (!weddingUsers || !expenses) return null;

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
                {(todoOptions || []).map((e, i) => (
                  <MenuItem key={i} value={e.key}>
                    {e.value}
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
                    <TextField id="date" name="date" {...props} />
                  )}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item md={5} pr={10}>
            <div className={classes.block}>
              <Typography color="GrayText" variant="h6">
                Przypisano do:
              </Typography>
              <Autocomplete
                disablePortal
                id="assigned"
                size="small"
                options={weddingUsers}
                getOptionLabel={(option) => option.name || option.email}
                value={user}
                onChange={(e, v) => setUser(v)}
                renderInput={(params) => (
                  <TextField name="assigned" {...params} />
                )}
              />
            </div>
            {/*<div className={classes.block}>
              <Typography component="label" color="GrayText" variant="h6">
                Wydatki powiązane z zadaniem:
              </Typography>
              <Autocomplete
                size="small"
                key={clear.toString()}
                options={searchableExpenses}
                value={searchedExpense}
                className={classes.select}
                getOptionLabel={(option) => option.name}
                //@ts-ignore
                onChange={(e, v) => setSearchedExpense(v)}
                renderInput={(params) => (
                  <TextField
                    name="expenses"
                    placeholder="wybierz powiązany wydatek"
                    {...params}
                  />
                )}
              />
              <Button
                variant="contained"
                className={classes.btn}
                onClick={() => {
                  if (!!searchedExpense) {
                    setExpenseInList(expenseInList.concat([searchedExpense]));
                    setSearchedExpense(null);
                    setClear(!clear);
                  }
                }}
              >
                Dodaj
              </Button>
            </div>*
            <List className={classes.list}>
              {expenseInList.map((exp) => (
                <ListItem
                  key={exp.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        setExpenseInList(expenseInList.filter((o) => o != exp))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${exp.name}`} />
                </ListItem>
              ))}
                </List>*/}
          </Grid>
          <Grid item md={12} pr={10}>
            <div className={classes.block}>
              <Typography color="GrayText" variant="h6">
                Uwagi:
              </Typography>
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
