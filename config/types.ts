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
