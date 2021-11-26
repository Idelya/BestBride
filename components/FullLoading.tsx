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
    top: 0,
    minwidth: "100vw",
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
