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
  email?: string;
  id?: number;
  role?: string;
};
