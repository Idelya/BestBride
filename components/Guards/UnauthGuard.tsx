import { Container } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../config/types";
import { AuthStates } from "../../store/slices/auth";
import { OurStore } from "../../store/store";
import Loading from "../Loading";

export const UnauthGuard: React.FC = ({ children }) => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer);
  const router = useRouter();
  useEffect(() => {
    async function redirect() {
      if (me && me.role === ROLE.COMPANY) {
        await router.push("/companies-locations-list");
      } else if (me && me.role === ROLE.USER) {
        await router.push("/start");
      }
    }

    if (loading != AuthStates.LOADING && !!me) {
      redirect();
    }
  }, [loading, me, router]);

  if (loading === AuthStates.LOADING || !!me) {
    return (
      <Container sx={{ minHeight: "100vh", display: "flex", minWidth: "100%" }}>
        <Loading />
      </Container>
    );
  }

  return <>{children}</>;
};
