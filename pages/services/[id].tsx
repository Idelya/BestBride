import { useRouter } from "next/router";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CompaniesLocationsListPage } from "../../components/CompaniesLocationsListPage";
import { User } from "../../config/types";
import { setUser } from "../../store/slices/auth";
import { authServicePage } from "../../store/auth";
import { LocationPage } from "../../components/LocationPage";

export const getServerSideProps = authServicePage;

const AdminAuthGuard = dynamic<{}>(() =>
  import("../../components/Guards/AdminAuthGuard").then(
    (mod) => mod.AdminAuthGuard
  )
);

const Location: NextPage<{
  user: User;
  isOwner: { isMyService: boolean };
  children?: ReactNode;
}> = ({
  user,
  isOwner,
}: {
  user: User;
  isOwner: { isMyService: boolean };
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ me: user }));
  });
  console.log(isOwner);
  return isOwner.isMyService ? (
    <LocationPage />
  ) : (
    <AdminAuthGuard>
      <LocationPage />
    </AdminAuthGuard>
  );
};

export default Location;
