import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Heading from "../Heading";
import service from "../../public/img/service.jpg";
import Image from "next/image";
import { Theme } from "@mui/system";
import { toBase64 } from "../../utils/helpers";
import { ImgPlaceholder } from "../ImgPlaceholder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      top: "20%",
    },

    img: {
      position: "absolute",
      height: "50vh",
      width: "100%",
      top: "0",
      zIndex: -1,

      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.44)",
      },
    },
    wrapper: {
      position: "relative",
      height: "60vh",
      width: "100%",
    },
  })
);

export default function Banner({
  currentCategory,
}: {
  currentCategory: number | null;
}) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <Heading>Usługi</Heading>
      </div>
      <div className={classes.img}>
        <Image
          src={service}
          alt=""
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            ImgPlaceholder(400, 475)
          )}`}
        />
      </div>
    </div>
  );
}
