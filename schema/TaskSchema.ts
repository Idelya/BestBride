import * as yup from "yup";

export const initialValues = {
  name: "",
  status: 0,
  additionalInfo: "",
};

export const taskSchemaValidation: any = yup.object({
  name: yup.string().required(),
  status: yup.number(),
  additionalInfo: yup.string(),
});
