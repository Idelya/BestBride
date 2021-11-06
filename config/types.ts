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

export type ServiceStatusType = "Wersja robocza";

export type Service = {
  id: number;
  img: string;
  status: ServiceStatusType;
  name: string;
};
