import type { NextPage } from "next";
import React from "react";
import { BudgetPage } from "../components/BudgetPage";
import dynamic from "next/dynamic";

const AuthGuard = dynamic<{}>(() =>
  import("../components/Guards/AuthGuard").then((mod) => mod.AuthGuard)
);
const Budget: NextPage = () => {
  return <BudgetPage />;
};

export default Budget;
