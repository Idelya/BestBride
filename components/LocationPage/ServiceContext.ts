import React, { createContext } from "react";
import { ExpenseCategory, Service } from "../../config/types";

export const ServiceContext = createContext<{
  currentService?: Service;
  categories?: ExpenseCategory[];
  mode: "view" | "edit";
  setService: (newService: Service) => void;
  profileImg?: File;
  setProfileImg: (profileImg: File) => void;
}>({
  currentService: undefined,
  setService: (newService) => {},
  categories: undefined,
  mode: "view",
  profileImg: undefined,
  setProfileImg: (file) => {},
});
