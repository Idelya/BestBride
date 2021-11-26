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
    name: "Planner",
    link: "/planner",
  },
  budget: {
    name: "Budżet",
    link: "/budget",
  },
  weddingSettings: {
    name: "Dane ślubu",
    link: "/profil/#weddingSettings",
  },
  guestList: {
    name: "Lista gości",
    link: "/guest-list",
  },
};

export const GUEST_ROUTES_NAV = [
  ROUTES.aboutUs,
  ROUTES.services,
  ROUTES.forCompanies,
];

export const USER_ROUTES_NAV = [
  ROUTES.organizer,
  ROUTES.guestList,
  ROUTES.services,
  ROUTES.budget,
];

export const USER_MENU = [ROUTES.profil, ROUTES.weddingSettings];
