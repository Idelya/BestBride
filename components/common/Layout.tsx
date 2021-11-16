import React, { ReactNode, useEffect } from "react";
import { Footer } from "../Footer";

import { Header } from "../Header";

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
