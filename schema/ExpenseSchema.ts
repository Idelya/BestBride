import * as yup from "yup";

export const initialValues = {
  name: "",
  price: 0,
  paymentDate: undefined,
  finalDate: undefined,
  paid: 0,
  category: undefined,
  additionalInfo: "",
};

export const expenseSchemaValidation: any = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  paid: yup.number(),
  paymentDate: yup.date(),
  finalDate: yup.date(),
  status: yup.string(),
  category: yup.string(),
  additionalInfo: yup.string(),
});
