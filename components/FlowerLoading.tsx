import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import Image from "next/image";
import flower from "../public/flower.gif";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "white",
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    minWidth: "100vw",
    zIndex: 10,
  },
  loadinerBox: {
    height: "200px",
    width: "200px",
    "& > div": {
      width: "100%",
    },
  },
}));
export default function FullLoading() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.loadinerBox}>
        <Image
          alt="Pobieranie..."
          src={flower}
          layout="responsive"
          width={200}
          height={200}
          objectFit="contain"
        />
      </Box>
    </Box>
  );
}
