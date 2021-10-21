import type { NextPage } from "next";
import React from "react";
import { ProfilPage } from "../components/ProfilPage";
import dynamic from "next/dynamic";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);
const Profil: NextPage = () => {
  return (
    <AuthGuard>
      <ProfilPage />
    </AuthGuard>
  );
};

export default Profil;
