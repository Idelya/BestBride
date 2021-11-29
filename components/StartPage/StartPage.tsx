import React, { useEffect } from "react";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import start from "../../public/img/start.jpg";
import Logo from "../Logo";
import { Box, flexbox } from "@mui/system";
import { toBase64 } from "../../utils/helpers";
import { ImgPlaceholder } from "../ImgPlaceholder";
import DecorationTypography from "../DecorationTypography";
import UnderlinedLink from "../UnderlinedLink";
import { ROUTES } from "../../config/configNav";
import { Typography } from "@mui/material";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import { ArrowDown } from "../../animations/ArrowDown";

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
    width: "100%",
  },
  contentBanner: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& >*": {
      marginTop: "56px",
    },
  },
});

export default function StartPage() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <div className={classes.img}>
        <Image
          src={start}
          alt=""
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            ImgPlaceholder(400, 475)
          )}`}
        />
      </div>
      <div className={classes.contentBanner}>
        <Logo variantLogo="h3" />
        <DecorationTypography>
          Twój pomocnik w organizacji wymarzonego wesela
        </DecorationTypography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Dowiedz się więcej!</Typography>
          <Box
            sx={{ width: " 100%", display: "flex", justifyContent: "center" }}
          >
            <ArrowDown />
          </Box>
        </Box>
      </div>
    </div>
  );
}
