export type Route = {
  name: string;
  link: string;
};

export type Guest = {
  id: number;
  surname: string;
  name: string;
  invitationAccepted: string;
  invitationSend: boolean;
  eMail?: string;
  phone?: string;
  city?: string;
  children: number;
  isWithness: boolean;
  accompanyingPerson?: number;
  accommodation: boolean;
  transport: boolean;
  groups: number[];
  diets: string[];
  remarks?: string;
};

export type Group = {
  name: string;
  guests: Guest[];
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
