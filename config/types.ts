export type Route = {
  name: string;
  link: string;
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
  accommodation: boolean;
  transport: boolean;
  age?: number;
  gender?: number;
  guestsGroupGuests: number[];
  diet: string[];
  additionalInfo?: string;
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
