import { Button } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { StartUserPage } from "../components/StartUserPage";
import { User } from "../config/types";
import { authPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);

export const getServerSideProps = authPage;
const Start: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ me: user }));
  });
  return (
    <AuthGuard>
      <StartUserPage />
    </AuthGuard>
  );
};

export default Start;
