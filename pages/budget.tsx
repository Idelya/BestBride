import type { NextPage } from "next";
import React, { ReactNode, useEffect } from "react";
import { BudgetPage } from "../components/BudgetPage";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { User } from "../config/types";
import { authPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);

export const getServerSideProps = authPage;
const Budget: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ me: user }));
  });
  return (
    <AuthGuard>
      <BudgetPage />
    </AuthGuard>
  );
};

export default Budget;
