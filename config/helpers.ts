import { getHours } from "date-fns";
import { Diet, ExpenseCategory, Option } from "./types";
export const getValue = (options: Option[], key?: number): string =>
  key || key === 0
    ? options.find((option) => option.key === key)?.value || "Brak danych"
    : "Brak danych";

export const getValueFromDiet = (options: Diet[], id?: number): string => {
  return id || id === 0
    ? options.find((option) => option.id === id)?.name || "Brak danych"
    : "Brak danych";
};

export const getValueFromExpenseCategory = (
  options: ExpenseCategory[],
  id?: number
): string => {
  return id || id === 0
    ? options.find((option) => option.id === id)?.name || "Brak danych"
    : "Brak danych";
};

export const getDiffInHours = (date1: Date, date2: Date) => {
  //@ts-ignore
  const hours = (date2 - date1) / 36e5;
  return hours;
};

export const formatDateWithHour = (date: Date) => {
  const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}`;
  const hour = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`;
  const minutes = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minutes}`;
};

export const formatDate = (date: Date) => {
  const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}`;
};

export const blockToText = (content: any) => {
  if (content) {
    let toStr = "";
    for (var i = 0; i < content.blocks.length; i++) {
      toStr += content.blocks[i].text + "\n ";
    }
    return toStr;
  }
};
