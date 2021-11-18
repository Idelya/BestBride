import { number, string } from "yup/lib/locale";

export type Wedding = {
  id?: number;
  date?: Date;
  budget?: number;
  plannedGuestAmmount?: number;
};

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

export type Guest = {
  id: number;
  surname?: string;
  name: string;
  status: number;
  email: string;
  phone?: string;
  city?: string;
  children: number;
  isWitness: boolean;
  partner?: number;
  partnerName?: string;
  accommodation: boolean;
  transport: boolean;
  age?: number;
  gender?: number;
  groups: number[];
  diet: number;
  additionalInfo?: string;
};

export type Group = {
  id?: number;
  name: string;
  guests: Guest[];
};

export type Expense = {
  id: number;
  name: string;
  price: number;
  paymentDate?: Date;
  finalDate?: Date;
  paid: number;
  expensesCategory: string;
  additionalInfo?: string;
  service?: number;
  toDo?: number;
  whoAdded?: number;
};

export type ExpenseCategory = {
  id: number;
  name: string;
};

export const OPTIONS_STATUS = ["opłacone", "zaplanowane"];
export type User = {
  name?: string;
  email: string;
  id?: number;
  role: string;
};

export type UserPlanner = {
  name?: string;
  email: string;
  id?: number;
};

export const ROLE = {
  USER: "user",
  ADMIN: "admin",
  COMPANY: "firm",
};
export type RoleType = "user" | "admin" | "firm";

export type ServiceStatusType = "Wersja robocza";

export type Service = {
  id: number;
  img: string;
  status: ServiceStatusType;
  name: string;
  offer: string;
};

export type Option = {
  key: number;
  value: string;
};

export type Diet = {
  id: number;
  name: string;
};
export type Phase = {
  id: number;
  name?: string;
  tasks?: number;
  doneTasks?: number;
};

export type Task = {
  id: number;
  order: number;
  name: string;
  status: number;
  date?: Date;
  assigned?: {
    id: number;
    name?: string;
    email: string;
  };
  expanses?: {
    id: number;
    name: string;
  }[];
  additionalInfo?: string;
};
