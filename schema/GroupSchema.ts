import * as yup from "yup";

export const initialValues = {
  name: "",
};

export const groupSchemaValidation: any = yup.object({
  name: yup.string(),
});
