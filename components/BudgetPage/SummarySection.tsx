import React, { useContext, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import {
  Typography,
  Divider as Seperate,
  Theme,
  Button,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import btnImg from "../../public/btn.png";
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";
import { ExpenseContext } from "./ExpenseContext";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { Wedding } from "../../config/types";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2),
      "& *": {
        textTransform: "none",
      },
      "& input": {
        padding: 0,
      },
    },
    buttonImg: {
      width: "300px",
      height: "70px",
      "&:hover": {
        opacity: "70%",
      },
    },
    buttonTxt: {
      position: "absolute",
      top: theme.spacing(1.25),
    },
    stats: {
      display: "flex",
      justifyContent: "center",
    },
    box: {
      position: "relative",
    },
  })
);

const data = ["paymentSum", "plannedPaymentSum", "freeFunds"];

const names = {
  paymentSum: "Zapłacone",
  plannedPaymentSum: "Do zapłaty",
  freeFunds: "Wolne środki",
};

const COLORS = ["#64150F", "#C8291E", "#F2ABA6"];

export default function SummarySection() {
  const classes = useStyles();
  const [editBudget, setEditBudget] = useState(false);
  const { budgetStats, mutateBudget, wedding } = useContext(ExpenseContext);
  const [budget, setBudget] = useState(budgetStats?.budget || 0);
  console.log(budgetStats);
  const handleSaveBudget = async () => {
    if (!wedding) return;
    try {
      const x = await axios.put("/api/weddingEdit/" + wedding.id, {
        ...wedding,
        budget: budget,
      });
      setEditBudget(false);
      mutateBudget();
      if (x.data) {
        store.addNotification({
          title: "Success",
          message: "Zmieniono budżet.",
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
    } catch (err) {
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
  };

  return (
    <section>
      <Divider component="h2">Podsumowanie</Divider>
      <Grid container spacing={10} sx={{ marginBottom: "32px" }}>
        <Grid item md={6}>
          <div className={classes.inline}>
            <Typography variant="h6" color="primary">
              Zapłacone
            </Typography>
            <Typography variant="h6">{`${
              budgetStats?.paymentSum || 0
            } zł`}</Typography>
          </div>
          <div className={classes.inline}>
            <Typography variant="h6" color="primary">
              Do zapłaty
            </Typography>
            <Typography variant="h6" color="primary">{`${
              budgetStats?.plannedPaymentSum || 0
            } zł`}</Typography>
          </div>
          <div className={classes.inline}>
            <Typography variant="h6" color="primary">
              Budżet
            </Typography>
            {editBudget ? (
              <Box>
                <TextField
                  id="budget"
                  name="budget"
                  size="small"
                  InputProps={{
                    inputProps: { min: 0 },
                    style: { padding: "3px 5px" },
                  }}
                  InputLabelProps={{ style: { padding: "3px 5px" } }}
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                />
              </Box>
            ) : (
              <Typography variant="h6" color="primary">{`${
                budgetStats?.budget || 0
              } zł`}</Typography>
            )}
          </div>
          <Seperate color="primary" />
          <div className={classes.inline}>
            <Typography variant="h5" color="primary">
              Wolne środki
            </Typography>
            <Typography variant="h5" color="primary">{`${
              budgetStats?.freeFunds || 0
            } zł`}</Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={classes.stats}>
            <PieChart
              width={400}
              height={300}
              data={data
                .map((key) => {
                  return {
                    //@ts-ignore
                    value: budgetStats ? budgetStats[key] : 0,
                    //@ts-ignore
                    name: names[key],
                  };
                })
                .filter((e) => e.value >= 0)}
            >
              <Legend />
              <Pie
                data={data
                  .map((key) => {
                    return {
                      //@ts-ignore
                      value: budgetStats ? budgetStats[key] : 0,
                      //@ts-ignore
                      name: names[key],
                    };
                  })
                  .filter((e) => e.value >= 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                labelLine
                fill="#8884d8"
                dataKey="value"
                label
                paddingAngle={5}
              >
                {data
                  .map((key) => {
                    return {
                      //@ts-ignore
                      value: budgetStats ? budgetStats[key] : 0,
                      //@ts-ignore
                      name: names[key],
                    };
                  })
                  .filter((e) => e.value >= 0)
                  .map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
            </PieChart>
          </div>
        </Grid>
      </Grid>
      <div className={classes.inline}>
        {editBudget ? (
          <Button startIcon={<SaveIcon />} onClick={handleSaveBudget}>
            Zapisz budżet
          </Button>
        ) : (
          <Button startIcon={<EditIcon />} onClick={() => setEditBudget(true)}>
            Edytuj budżet
          </Button>
        )}
        {/*<Button
          className={classes.buttonImg}
          disableRipple
          disableFocusRipple
          style={{ backgroundColor: "transparent" }}
        >
          <Image src={btnImg} alt="" />
          <Typography className={classes.buttonTxt}>
            Zobacz inne statystyki
          </Typography>
        </Button>*/}
      </div>
    </section>
  );
}
