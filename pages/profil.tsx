import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "../components/Guards/AuthGuard";
import { ProfilPage } from "../components/ProfilPage";

const Profil: NextPage = () => {
  return (
    <AuthGuard>
      <ProfilPage />
    </AuthGuard>
  );
};

export default Profil;
