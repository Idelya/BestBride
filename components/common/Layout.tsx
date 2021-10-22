import { createTheme, ThemeProvider } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { Footer } from "../Footer";

import { Header } from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { OurStore } from "../../store/store";

interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
export default Layout;
