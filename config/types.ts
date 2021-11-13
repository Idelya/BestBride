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
  surname: string;
  name: string;
  invitationAccepted: string;
  invitationSend: boolean;
  mail?: string;
  phone?: string;
  city?: string;
  children: number;
  witness: boolean;
  accompanyingPerson?: number;
  accommodation: boolean;
  transport: boolean;
  groups: number[];
  diets: string[];
  remarks?: string;
};

export type Expense = {
  id: number;
  name: string;
  price: number;
  paymentDate?: string;
  finalDate?: string;
  status: "opłacone" | "zaplanowane";
  estiamtedPrice?: number;
  type?: string;
  remarks?: string;
  service?: number;
  task?: number;
};
export const OPTIONS_STATUS = ["opłacone", "zaplanowane"];
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

export type ServiceStatusType = "Wersja robocza";

export type Service = {
  id: number;
  img: string;
  status: ServiceStatusType;
  name: string;
  offer: string;
};
