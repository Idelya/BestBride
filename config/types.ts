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

export type IsAfterData = { id: number; isAfter: boolean };
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
  partnerId?: number;
  partnerName?: string;
  accomodation: boolean;
  transport: boolean;
  age?: number;
  gender?: number;
  groups: Group[];
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
  category: number;
  additionalInfo?: string;
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
  photo?: string;
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

export type Service = {
  id?: number;
  innerKey?: number;
  img?: string;
  status?: number;
  name?: string;
  details?: string;
  detailsStyle?: string;
  rejectionDetails?: string;
  fileLink?: string;
  galleryFile?: string;
  expenseId?: number;
  category?: number;
  contact?: Contact;
  address?: Address;
  images?: string[];
  version?: number;
};

export type FullService = {
  id?: number;
  innerKey?: number;
  status?: number;
  name?: string;
  details?: string;
  detailsStyle?: string;
  rejectionDetails?: string;
  fileLink?: string;
  galleryFile?: string;
  category?: number;
  images?: string[];
  version?: number;
  email?: string;
  phone?: string;
  url?: string;
  contactDetails?: string;
  country?: string;
  city?: string;
  region?: string;
  street?: string;
  streetNumber?: string;
  streetNumber2?: string;
};

export type Contact = {
  email?: string;
  phone?: string;
  url?: string;
  details?: string;
};

export type Address = {
  country?: string;
  city?: string;
  region?: string;
  street?: string;
  streetNumber?: string;
  streetNumber2?: string;
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

export type PhaseStat = {
  done: number;
  inProgress: number;
  name: string;
  notStarted: number;
  phaseId: number;
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
