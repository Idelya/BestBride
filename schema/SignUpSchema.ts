import * as yup from "yup";

export const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const signUpSchemaValidation: any = yup.object({
  email: yup
    .string()
    .email("Wprowadz poprawny email")
    .required("Wprowadz email"),
  password: yup
    .string()
    .min(8, "Hasło jest za krótkie")
    .required("Hasło jest wymagane"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Powtórz hasło"),
});
