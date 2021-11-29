import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    minWidth: "100vw",
    zIndex: 9,
    backgroundColor: "white",
  },
}));
export default function FullLoading({
  withMargin = true,
}: {
  withMargin?: boolean;
}) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CircularProgress />
    </Box>
  );
}
