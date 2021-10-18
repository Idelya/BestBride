import * as yup from "yup";

export const initialValues = {
  surname: "",
  name: "",
  invitationAccepted: "?",
  invitationSend: false,
  mail: "",
  phone: "",
  city: "",
  children: 0,
  witness: false,
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
  mail: yup.string(),
  phone: yup.string(),
  city: yup.string(),
  children: yup.number(),
  witness: yup.boolean(),
  accompanyingPerson: yup.number(),
  accommodation: yup.boolean(),
  transport: yup.boolean(),
  groups: yup.array(),
  diets: yup.array(),
  remarks: yup.string(),
});
