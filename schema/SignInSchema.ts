import * as yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const signInSchemaValidation: any = yup.object({
  email: yup
    .string()
    .email("Wprowadz poprawny email")
    .required("Wprowadz email"),
  password: yup
    .string()
    .min(8, "Hasło jest za krótkie")
    .required("Hasło jest wymagane"),
});
