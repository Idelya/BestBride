import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#64150F",
    },
    secondary: {
      main: "#E19A80",
    },
    success: {
      main: "#9FE69D",
    },
    info: {
      main: "#7A9ED6",
    },
    error: {
      main: "#DE847D",
    },
  },
  typography: {
    fontFamily: `"Segoe UI", "Helvetica", "Arial", sans-serif`,
  },
});
