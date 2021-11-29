import { Button } from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { ServicesPage } from "../components/ServicesPage";
import { User } from "../config/types";
import { authPage } from "../store/auth";
import { setUser } from "../store/slices/auth";
import user from "./api/user";

export const getServerSideProps = authPage;
const Services: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ me: user }));
  });
  return <ServicesPage />;
};

export default Services;
