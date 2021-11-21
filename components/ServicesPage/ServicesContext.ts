import React, { createContext } from "react";
import { ExpenseCategory } from "../../config/types";

export const ServicesContext = createContext<{
  expenseOptions?: ExpenseCategory[];
}>({
  expenseOptions: undefined,
});
