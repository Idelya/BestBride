import React, { createContext } from "react";
import { ExpenseCategory } from "../../config/types";

export const ExpenseContext = createContext<{
  expenseOptions?: ExpenseCategory[];
}>({
  expenseOptions: undefined,
});
