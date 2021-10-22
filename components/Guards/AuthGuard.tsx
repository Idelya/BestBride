import { Container } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
    if (!me) {
      redirect();
    }
  }, [me, router]);

  if (loading === AuthStates.LOADING || !me) {
    return (
      <Container sx={{ minHeight: "100vh", display: "flex", minWidth: "100%" }}>
        <Loading />
      </Container>
    );
  }

  return <>{children}</>;
};