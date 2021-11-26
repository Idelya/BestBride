import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CompaniesLocationsListPage } from "../components/CompaniesLocationsListPage";
import { User } from "../config/types";
import { setUser } from "../store/slices/auth";
import { authPage } from "../store/auth";

const CompanyAuthGuard = dynamic<{}>(() =>
  import("../components/Guards/CompanyAuthGuard").then(
    (mod) => mod.CompanyAuthGuard
  )
);

export const getServerSideProps = authPage;

const CompaniesLocationslist: NextPage<{ user: User; children?: ReactNode }> =
  ({ user }: { user: User; children?: ReactNode }) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setUser({ me: user }));
    });
    return (
      <CompanyAuthGuard>
        <CompaniesLocationsListPage />
      </CompanyAuthGuard>
    );
  };

export default CompaniesLocationslist;
