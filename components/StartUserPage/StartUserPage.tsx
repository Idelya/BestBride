import React from "react";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import start from "../../public/img/startUser.jpg";
import Logo from "../Logo";
import Banner from "./Banner";
import CalendarSection from "./CalendarSection";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

export default function StartUserPage() {
  const classes = useStyles();
  return (
    <div>
      <Banner />
      <CalendarSection />
    </div>
  );
}
