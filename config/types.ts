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
