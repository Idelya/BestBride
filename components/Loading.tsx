import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading({
  withMargin = true,
}: {
  withMargin?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", margin: withMargin ? "auto" : 0 }}>
      <CircularProgress />
    </Box>
  );
}
