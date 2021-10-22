import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OurStore } from "../../store/store";

export const UnauthGuard: React.FC = ({ children }) => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      await router.push("/start");
    }
    if (me) {
      redirect();
    }
  }, [me, router]);

  if (loading === "loading") {
    return <>loading...</>;
  }

  return <>{children}</>;
};
