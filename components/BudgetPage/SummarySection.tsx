import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Divider from "../Divider";
import Image from "next/image";
import { Typography, Divider as Seperate, Theme, Button } from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import btnImg from "../../public/btn.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      width: "50%",
    },
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
  })
);

const data = [
  { name: "Zapłacone", value: 10000 },
  { name: "Do zapłaty", value: 3000 },
  { name: "Budżet", value: 50000 },
  { name: "Wolne środki", value: 37000 },
];

export default function SummarySection() {
  const classes = useStyles();
  return (
    <section>
      <Divider component="h2">Podsumowanie</Divider>
      <div className={classes.summary}>
        <div className={classes.inline}>
          <Typography variant="h6" color="primary">
            Zapłacone
          </Typography>
          <Typography variant="h6">{`${data[0].value} zł`}</Typography>
        </div>
        <div className={classes.inline}>
          <Typography variant="h6" color="primary">
            Do zapłaty
          </Typography>
          <Typography
            variant="h6"
            color="primary"
          >{`${data[1].value} zł`}</Typography>
        </div>
        <div className={classes.inline}>
          <Typography variant="h6" color="primary">
            Budżet
          </Typography>
          <Typography
            variant="h6"
            color="primary"
          >{`${data[2].value} zł`}</Typography>
        </div>
        <Seperate color="primary" />
        <div className={classes.inline}>
          <Typography variant="h5" color="primary">
            Wolne środki
          </Typography>
          <Typography
            variant="h5"
            color="primary"
          >{`${data[3].value} zł`}</Typography>
        </div>
      </div>
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
            Zobacz statystyki
          </Typography>
        </Button>
      </div>
    </section>
  );
}
