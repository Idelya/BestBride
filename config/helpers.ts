import { Diet, Option } from "./types";
export const getValue = (options: Option[], key?: number): string =>
  key || key === 0
    ? options.find((option) => option.key === key)?.value || "Brak danych"
    : "Brak danych";

export const getValueFromDiet = (options: Diet[], id?: number): string => {
  return id || id === 0
    ? options.find((option) => option.id === id)?.name || "Brak danych"
    : "Brak danych";
};
