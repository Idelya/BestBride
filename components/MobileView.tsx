import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import Image from "next/image";
import flower from "../public/flower.gif";
import DecorationTypography from "./DecorationTypography";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "white",
    position: "fixed",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    minWidth: "100vw",
    zIndex: 10,

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  loadinerBox: {
    height: "200px",
    width: "200px",
    "& > div": {
      width: "100%",
    },
  },
  desktop: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
export default function MobileView({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes = useStyles();
  return (
    <>
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
        <Typography>
          Wykryto urządzenie mobilne. Zapraszamy do pobrania aplikacji.
        </Typography>
      </Box>
      <Box className={classes.desktop}>{children}</Box>
    </>
  );
}
