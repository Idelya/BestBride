import { useRouter } from "next/router";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CompaniesLocationsListPage } from "../../components/CompaniesLocationsListPage";
import { User } from "../../config/types";
import { setUser } from "../../store/slices/auth";
import { authPage } from "../../store/auth";
import { LocationPage } from "../../components/LocationPage";

export const getServerSideProps = authPage;

const Location: NextPage<{ user: User; children?: ReactNode }> = ({
  user,
}: {
  user: User;
  children?: ReactNode;
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ me: user }));
  });
  return <LocationPage />;
};

export default Location;
