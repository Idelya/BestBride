import React, { useContext } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import {
  Typography,
  Divider as Seperate,
  Theme,
  Button,
  Grid,
} from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import btnImg from "../../public/btn.png";
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";
import { ExpenseContext } from "./ExpenseContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2),
      "& *": {
        textTransform: "none",
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

  const { budgetStats } = useContext(ExpenseContext);
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
            <Typography variant="h6" color="primary">{`${
              budgetStats?.budget || 0
            } zł`}</Typography>
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
              width={300}
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
        <Button startIcon={<EditIcon />}>Edytuj budżet</Button>
        <Button
          className={classes.buttonImg}
          disableRipple
          disableFocusRipple
          style={{ backgroundColor: "transparent" }}
        >
          <Image src={btnImg} alt="" />
          <Typography className={classes.buttonTxt}>
            Zobacz inne statystyki
          </Typography>
        </Button>
      </div>
    </section>
  );
}
