import React, { createContext } from "react";
import { Option, Task, Wedding, PhaseStat, Phase } from "../../config/types";

export const PlannerContext = createContext<{
  todoOptions?: Option[];
  wedding?: Wedding;
  editedTask?: Task | null;
  setEditedTask: (task: Task | null) => void;
  update: boolean;
  setUpdate: () => void;
  statsByPhase?: PhaseStat[];
  phases: Phase[];
  generalPhase?: Phase;
  editedPhase?: Phase | null;
  setEditedPhase: (phase?: Phase | null) => void;
}>({
  todoOptions: undefined,
  wedding: undefined,
  editedTask: undefined,
  setEditedTask: (_) => {},
  update: false,
  setUpdate: () => {},
  statsByPhase: [],
  phases: [],
  generalPhase: undefined,
  editedPhase: null,
  setEditedPhase: () => {},
});
