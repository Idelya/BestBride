import * as yup from "yup";

export const initialValues = {
  role: "Pan Młody",
  namePartner: "",
  surnamePartner: "",
  weddingDate: undefined,
  church: "",
  witness1: "",
  witness2: "",
};

export const roleOptions = ["Panna Młoda", "Pan Młody"];

export const weddingSchemaValidation: any = yup.object({
  role: yup.string(),
  namePartner: yup.string(),
  surnamePartner: yup.string(),
  church: yup.string(),
  weddingDate: yup.date(),
  witness1: yup.string(),
  witness2: yup.string(),
});
