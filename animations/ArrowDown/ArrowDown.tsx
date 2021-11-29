import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, flexbox, Theme } from "@mui/system";
import { Arrow } from "./Arrow";
import { toBase64 } from "../../utils/helpers";

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes move": {
    "0%": { opacity: 1, transform: "translateX(0px) scale(1)" },
    "25%": { opacity: 0, transform: "translateX(10px) scale(0.9)" },
    "26%": { opacity: 0, transform: "translateX(-10px) scale(0.9)" },
    "55%": { opacity: 1, transform: "translateX(0px) scale(1)" },
  },
  root: {
    backgroundColor: "black",
  },
  circle: {
    position: "relative",
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: "100%",
    "& #sec": {
      marginLeft: theme.spacing(1),
    },
    "&:hover": {
      "& #fst": {
        animation: "$move 2s linear",
        animationDelay: "0.2s",
      },

      "& #sec": {
        animation: "$move 2s linear",
      },
    },
  },
  arrow: {
    left: "30%",
    position: "absolute",
    bottom: 0,
    marginLeft: "0px",
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    top: "13px",
    color: theme.palette.primary.main,
    backgroundSize: "contain",
    backgroundImage: `url(data:image/svg+xml;base64,${toBase64(Arrow())})`,
  },
  content: {
    width: "100%",
    height: "100%",
    position: "absolute",
    transform: "rotate(90deg)",
  },
}));

export default function ArrowDown() {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      <div className={classes.content}>
        <span id="fst" className={classes.arrow} />
        <span id="sec" className={classes.arrow} />
      </div>
    </div>
  );
}
