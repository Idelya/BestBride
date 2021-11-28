import * as yup from "yup";
import { number } from "yup/lib/locale";

export const initialValues = {
  surname: "string",
  name: "",
  email: "",
  phone: "",
  city: "",
  isWitness: false,
  status: 0,
  children: 0,
  partner: undefined,
  accomodation: false,
  transport: false,
  guestsGroupGuests: [],
  diet: 4,
  additionalInfo: "",
  gender: 0,
  age: 0,
};

export const guestSchemaValidation: any = yup.object({
  surname: yup.string(),
  name: yup
    .string()
    .required()
    .test(
      "len",
      "Imię i nazwisko nie mogą mieć więcej niż 32 znaki",
      //@ts-ignore
      (val: string | undefined) => (val ? val.length <= 32 : false)
    ),
  email: yup.string().email().required(),
  phone: yup.string(),
  city: yup.string().test(
    "len",
    "Miasto nie może mieć więcej niż 32 znaki",
    //@ts-ignore
    (val: string | undefined) => (val ? val.length <= 32 : true)
  ),
  isWitness: yup.boolean(),
  status: yup.string().required(),
  children: yup.number().test(
    "len",
    "Liczba dzieci nie może byc mniejsza niż 0",
    //@ts-ignore
    (val: number | undefined) => (val ? val >= 0 : true)
  ),
  partner: yup.number(),
  accomodation: yup.boolean(),
  transport: yup.boolean(),
  guestsGroupGuests: yup.array(),
  diet: yup.array(),
  additionalInfo: yup
    .string()
    .test(
      "len",
      "uwagi nie mogą mieć więcej niż 150 znaków",
      (val: string | undefined) => (val ? val.length <= 32 : true)
    ),
});
