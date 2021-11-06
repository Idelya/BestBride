import * as yup from "yup";

export const initialValues = {
  name: "",
};

export const phaseSchemaValidation: any = yup.object({
  name: yup.string().required(),
});
