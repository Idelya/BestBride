import { number, string } from "yup/lib/locale";

export type Route = {
  name: string;
  link: string;
};

export type Event = {
  name: string;
  date?: string;
  localization?: string;
  assigned?: string[];
};

export type User = {
  name?: string;
  email: string;
  id?: number;
  role: string;
};

export const ROLE = {
  USER: "user",
  ADMIN: "admin",
  COMPANY: "firm",
};
export type RoleType = "user" | "admin" | "firm";

export type Phase = {
  id: number;
  name?: string;
  tasks: number;
  doneTasks: number;
};

export type TaskStatus = "nierozpoczęte" | "w trakcie" | "zakończone";

export const TASK_STATUS = {
  BACKLOG: "nierozpoczęte",
  WIP: "w trakcie",
  DONE: "zakończone",
};

export type Task = {
  id: number;
  name: string;
  status: TaskStatus;
  date: Date;
  assignedTo?: string;
  expanses?: {
    id: number;
    name: string;
  }[];
  remarks?: string;
};
