import { createTheme, ThemeProvider } from "@mui/material";
import React, { ReactNode, useEffect } from "react";

import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
export default Layout;
