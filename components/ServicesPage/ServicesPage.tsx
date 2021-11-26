import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Banner from "./Banner";
import { Container } from "@mui/material";
import { ServicesContext } from "./ServicesContext";
import useSWR from "swr";
import request from "../../config/requests";
import { ExpenseCategory } from "../../config/types";
import ServicesCategories from "./ServicesCategories";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

const fetcher = (url: string) => request.get(url).then((res) => res.data);
export default function ServicesPage() {
  const classes = useStyles();

  const [currentCategory, setCurrentCategry] = useState<number | null>(null);
  const { data: expenseOptions } = useSWR("api/expensescategory", fetcher) as {
    data: ExpenseCategory[];
  };
  return (
    <ServicesContext.Provider
      value={{
        expenseOptions: expenseOptions || [],
      }}
    >
      <div>
        <Banner currentCategory={currentCategory} />
        <ServicesCategories
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategry}
        />
      </div>
    </ServicesContext.Provider>
  );
}
