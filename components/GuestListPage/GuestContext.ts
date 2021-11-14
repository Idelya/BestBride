import React, { createContext } from "react";
import { Diet, Option } from "../../config/types";

export const GuestContext = createContext<{
  dietsOptions?: Diet[];
  genderOptions?: Option[];
  statusOptions?: Option[];
}>({
  dietsOptions: undefined,
  genderOptions: undefined,
  statusOptions: undefined,
});
