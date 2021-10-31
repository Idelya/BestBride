import { Button } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import StartPageCompanies from "../components/StartPageCompanies/StartPageCompanies";
import { User } from "../config/types";
import { authPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);

export const getServerSideProps = authPage;
const Companies: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  dispatch(setUser(user));
  return <StartPageCompanies />;
};

export default Companies;
