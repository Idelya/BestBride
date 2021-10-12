import { Button } from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Layout from "../components/common/Layout";
import { StartPage } from "../components/StartPage";

const Home: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  return <StartPage />;
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("getStaticProps");
  const data = await fetch(`https://e1jbdi.deta.dev/login`, {
    method: "POST",
    body: JSON.stringify({
      username: "Robert",
      password: "Mundziel",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
export default Home;
