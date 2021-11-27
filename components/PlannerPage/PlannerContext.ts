import React, { createContext } from "react";
import { Option, Task, Wedding } from "../../config/types";

export const PlannerContext = createContext<{
  todoOptions?: Option[];
  wedding?: Wedding;
  editedTask?: Task | null;
  setEditedTask: (task: Task | null) => void;
  update: boolean;
  setUpdate: () => void;
}>({
  todoOptions: undefined,
  wedding: undefined,
  editedTask: undefined,
  setEditedTask: (_) => {},
  update: false,
  setUpdate: () => {},
});
