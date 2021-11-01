import { Container } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../config/types";
import { AuthStates } from "../../store/slices/auth";
import { OurStore } from "../../store/store";
import Loading from "../Loading";

export const AuthGuard: React.FC = ({ children }) => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      await router.push("/");
    }
    async function redirectCompanies() {
      await router.push("/companies-locations-list");
    }

    if (loading != AuthStates.LOADING && !me) {
      redirect();
    } else if (
      loading != AuthStates.LOADING &&
      me &&
      me.role === ROLE.COMPANY
    ) {
      redirectCompanies();
    }
  }, [loading, me, router]);

  if (loading === AuthStates.LOADING || !me || me?.role != ROLE.USER) {
    return (
      <Container sx={{ minHeight: "100vh", display: "flex", minWidth: "100%" }}>
        <Loading />
      </Container>
    );
  }

  return <>{children}</>;
};
