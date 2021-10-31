import { Button } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { StartPage } from "../components/StartPage";
import request from "../config/requests";
import { User } from "../config/types";
import { authPage, unauthPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const UnauthGuard = dynamic<{}>(() =>
  import("../components/Guards/UnauthGuard").then((mod) => mod.UnauthGuard)
);

export const getServerSideProps = unauthPage;
const Home: NextPage<{ user?: User; children?: ReactNode }> = ({
  user,
}: {
  user?: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  dispatch(setUser(user || null));
  return (
    <UnauthGuard>
      <StartPage />
    </UnauthGuard>
  );
};

export default Home;
