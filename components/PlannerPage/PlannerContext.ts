import React, { createContext } from "react";
import { Option } from "../../config/types";

export const PlannerContext = createContext<{
  todoOptions?: Option[];
}>({
  todoOptions: undefined,
});
