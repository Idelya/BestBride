import React, { createContext } from "react";
import { ExpenseCategory } from "../../config/types";
import { StatsSum, StatsCount } from "./BudgetPage";

export const ExpenseContext = createContext<{
  expenseOptions?: ExpenseCategory[];
  budgetStats?: StatsCount & StatsSum;
}>({
  expenseOptions: undefined,
  budgetStats: undefined,
});
