import { Button } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode, useEffect } from "react";
import Layout from "../components/common/Layout";
import { SignInAdminPage } from "../components/SignInAdminPage";
import { setUser } from "../store/slices/auth";
import user from "./api/user";
import { User } from "../config/types";
import { unauthPage } from "../store/auth";

const UnauthGuard = dynamic<{}>(() =>
  import("../components/Guards/UnauthGuard").then((mod) => mod.UnauthGuard)
);

export const getServerSideProps = unauthPage;
const SignInAdmin: NextPage<{ user: User; children?: ReactNode }> = ({
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
    <UnauthGuard>
      <SignInAdminPage />
    </UnauthGuard>
  );
};

export default SignInAdmin;
