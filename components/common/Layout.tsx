import { createTheme, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";

import { theme } from "../../styles/theme";
import { Nav } from "../Nav";

const cTheme = createTheme(theme);

interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={cTheme}>
      <Nav />
      {children}
    </ThemeProvider>
  );
}
export default Layout;
