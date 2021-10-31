import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { SignInCompaniesPage } from "../components/SignInCompaniesPage";
import { User } from "../config/types";
import { unauthPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const UnauthGuard = dynamic<{}>(() =>
  import("../components/Guards/UnauthGuard").then((mod) => mod.UnauthGuard)
);

export const getServerSideProps = unauthPage;
const SignInCompanies: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  dispatch(setUser(user));
  return (
    <UnauthGuard>
      <SignInCompaniesPage />
    </UnauthGuard>
  );
};

export default SignInCompanies;
