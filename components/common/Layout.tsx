import React, { ReactNode, useEffect } from "react";
import { Footer } from "../Footer";

import { Header } from "../Header";
import MobileView from "../MobileView";

interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        <MobileView>{children}</MobileView>
      </main>
      <Footer />
    </>
  );
}
export default Layout;
