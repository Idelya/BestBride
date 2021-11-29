import React, { createContext } from "react";
import {
  Option,
  Task,
  Wedding,
  PhaseStat,
  Phase,
  UserPlanner,
  IsAfterData,
} from "../../config/types";

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
  weddingUsers?: UserPlanner[];
  tasksIsAfter: IsAfterData[];
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
  weddingUsers: [],
  tasksIsAfter: [],
});
