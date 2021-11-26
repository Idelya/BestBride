import React from "react";
import Image from "next/image";
import { createStyles, makeStyles } from "@mui/styles";
import start from "../../public/img/signup.jpg";
import { User, Option } from "../../config/types";
import Logo from "../Logo";
import {
  Box,
  Container,
  Link,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import RectangularButton from "../RectangularButton";
import UnderlinedLink from "../UnderlinedLink";
import { ROUTES } from "../../config/configNav";
import SignInForm from "../SignInForm";
import Divider from "../Divider";
import { spacing } from "@mui/system";
import ProfilSection from "./ProfilSection";
import WeddingSection from "./WeddingSection";
import { useSelector } from "react-redux";
import { OurStore } from "../../store/store";
import Loading from "../Loading";
import FullLoading from "../FullLoading";
import { AuthStates } from "../../store/slices/auth";
import request from "../../config/requests";
import useSWR from "swr";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      minHeight: "100vh",
    },
  })
);

const fetcher = (url: string) => request.get(url).then((res) => res.data);
export default function ProfilPage() {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer);
  const classes = useStyles();

  const { data: genderOptions } = useSWR("api/gender", fetcher) as {
    data: Option[];
  };

  if (!me || loading === AuthStates.LOADING || !genderOptions) {
    return <FullLoading />;
  }
  return (
    <div className={classes.container}>
      <ProfilSection me={me} genderOptions={genderOptions} />
      <WeddingSection />
    </div>
  );
}
