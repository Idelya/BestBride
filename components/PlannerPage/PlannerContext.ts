import React, { createContext } from "react";
import { Option, Wedding } from "../../config/types";

export const PlannerContext = createContext<{
  todoOptions?: Option[];
  wedding?: Wedding;
}>({
  todoOptions: undefined,
  wedding: undefined,
});
