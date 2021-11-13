import type { NextPage } from "next";
import React, { ReactNode, useEffect } from "react";
import { ProfilPage } from "../components/ProfilPage";
import dynamic from "next/dynamic";
import { OurStore, store, wrapper } from "../store/store";
import { fetchUser, setUser } from "../store/slices/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import request from "../config/requests";
import { User } from "../config/types";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { authPage } from "../store/auth";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);

export const getServerSideProps = authPage;
const Profil: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  dispatch(setUser({ me: user }));

  return (
    <AuthGuard>
      <ProfilPage />
    </AuthGuard>
  );
};

export default Profil;
