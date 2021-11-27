import React, { createContext } from "react";
import { ExpenseCategory, Wedding } from "../../config/types";
import { StatsSum, StatsCount } from "./BudgetPage";

export const ExpenseContext = createContext<{
  expenseOptions?: ExpenseCategory[];
  budgetStats?: StatsCount & StatsSum;
  mutateBudget: () => void;
  wedding?: Wedding;
}>({
  expenseOptions: undefined,
  budgetStats: undefined,
  mutateBudget: () => {},
  wedding: undefined,
});
