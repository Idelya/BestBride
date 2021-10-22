import * as yup from "yup";

export const initialValues = {
  role: "Panna Młoda",
  email: "",
  password: "",
  name: "",
  surname: "",
};

export const roleOptions = ["Panna Młoda", "Pan Młody"];

export const profilSchemaValidation: any = yup.object({
  role: yup.string().required("Wprowadz sową rolę"),
  email: yup
    .string()
    .email("Wprowadz poprawny email")
    .required("Wprowadz email"),
  password: yup
    .string()
    .min(8, "Hasło jest za krótkie")
    .required("Hasło jest wymagane"),
  name: yup.string(),
  surname: yup.string(),
});
