import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AdminPanelPage } from "../components/AdminPanelPage";
import { User } from "../config/types";
import { setUser } from "../store/slices/auth";
import { authPage } from "../store/auth";

const AdminAuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AdminAuthGuard").then(
    (mod) => mod.AdminAuthGuard
  )
);

export const getServerSideProps = authPage;

const Admin: NextPage<{ user: User; children?: ReactNode }> = ({
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
    <AdminAuthGuard>
      <AdminPanelPage />
    </AdminAuthGuard>
  );
};

export default Admin;
