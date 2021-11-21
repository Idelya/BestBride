import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { CompaniesLocationsListPage } from "../components/CompaniesLocationsListPage";
import { User } from "../config/types";
import { setUser } from "../store/slices/auth";
import { authPage } from "../store/auth";

const AdminAuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AdminAuthGuard").then(
    (mod) => mod.AdminAuthGuard
  )
);

export const getServerSideProps = authPage;

const CompaniesLocationslist: NextPage<{ user: User; children?: ReactNode }> =
  ({ user }: { user: User; children?: ReactNode }) => {
    const dispatch = useDispatch();
    dispatch(setUser(user));
    return (
      <AdminAuthGuard>
        <p>Admin</p>
      </AdminAuthGuard>
    );
  };

export default CompaniesLocationslist;
