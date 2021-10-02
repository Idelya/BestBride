import React from "react";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import start from "../../public/img/start.jpg";
import Logo from "../Logo";
import { flexbox } from "@mui/system";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  img: {
    position: "relative",
    height: "100vh",
    width: "100vh",
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage:
        "linear-gradient(90deg, rgba(255,255,255,0.37) 0%, rgba(255,255,255,1) 100%)",
    },
  },
  banner: {
    position: "relative",
    height: "100vh",
    width: "100vw",
  },
  contentBanner: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
    height: " 50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function StartPage() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <div className={classes.img}>
        <Image src={start} alt="" layout="fill" objectFit="contain" />
      </div>
      <div className={classes.contentBanner}>
        <Logo variantLogo="h4" />
      </div>
    </div>
  );
}
