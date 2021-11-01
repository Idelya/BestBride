export const ROUTES = {
  aboutUs: {
    name: "O nas",
    link: "/",
  },
  services: {
    name: "Usługi",
    link: "/services",
  },
  forCompanies: {
    name: "Dla firm",
    link: "/companies",
  },
  signUpClient: {
    name: "Zarejestruj się",
    link: "/signup",
  },
  signInClient: {
    name: "Zaloguj się",
    link: "/signin",
  },
  signUpCompanies: {
    name: "Zarejestruj swoją firmę",
    link: "/signup-companies",
  },
  signInCompanies: {
    name: "Zaloguj się",
    link: "/signin-companies",
  },
  profil: {
    name: "Profil",
    link: "/profil/#profil",
  },
  organizer: {
    name: "Orgaznizer",
    link: "/organizer",
  },
  budget: {
    name: "Budżet",
    link: "/budget",
  },
  calendar: {
    name: "Kalendarz",
    link: "/calendar",
  },
  weddingSettings: {
    name: "Dane ślubu",
    link: "/profil/#weddingSettings",
  },
};

export const GUEST_ROUTES_NAV = [
  ROUTES.aboutUs,
  ROUTES.services,
  ROUTES.forCompanies,
];

export const USER_ROUTES_NAV = [
  ROUTES.organizer,
  ROUTES.services,
  ROUTES.budget,
  ROUTES.calendar,
];

export const USER_MENU = [ROUTES.profil, ROUTES.weddingSettings];
