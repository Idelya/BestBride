import * as yup from "yup";
import { boolean } from "yup/lib/locale";

export const initialValues = {
  surname: "",
  name: "",
  invitationAccepted: "?",
  invitationSend: false,
  eMail: "",
  phone: "",
  city: "",
  children: 0,
  isWithness: false,
  accompanyingPerson: undefined,
  accommodation: false,
  transport: false,
  groups: [],
  diets: [],
  remarks: "",
};

export const dietsOptions = ["Wegetariańska", "Bezgltenowa", "Wegańska"];
export const invitationAcceptedsOptions = ["Tak", "Nie", "?"];

export const guestSchemaValidation: any = yup.object({
  surname: yup.string(),
  name: yup.string(),
  invitationAccepted: yup.string(),
  invitationSend: yup.boolean(),
  eMail: yup.string(),
  phone: yup.string(),
  city: yup.string(),
  children: yup.number(),
  isWithness: yup.boolean(),
  accompanyingPerson: yup.number(),
  accommodation: yup.boolean(),
  transport: yup.boolean(),
  groups: yup.array(),
  diets: yup.array(),
  remarks: yup.string(),
});
