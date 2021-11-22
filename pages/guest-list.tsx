import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GuestListPage } from "../components/GuestListPage";
import { User } from "../config/types";
import { authPage } from "../store/auth";
import { setUser } from "../store/slices/auth";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);

export const getServerSideProps = authPage;
const GuestList: NextPage<{ user: User; children?: ReactNode }> = ({
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
      <GuestListPage />
    </AuthGuard>
  );
};

export default GuestList;
