import { getHours } from "date-fns";
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

export const formatDate = (date: Date) => {
  const day = `${date.getDay() < 10 && "0"}${date.getDay()}`;
  const month = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth()}`;
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;
};
