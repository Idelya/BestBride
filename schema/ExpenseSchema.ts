import * as yup from "yup";

export const initialValues = {
  name: "",
  price: 0,
  paymentDate: undefined,
  finalDate: undefined,
  paid: 0,
  expensesCategory: undefined,
  additionalInfo: "",
  service: undefined,
  toDo: undefined,
};

export const expenseSchemaValidation: any = yup.object({
  name: yup.string().required(),
  price: yup.number().required(),
  paid: yup.number(),
  paymentDate: yup.date(),
  finalDate: yup.date(),
  status: yup.string(),
  expensesCategory: yup.string(),
  additionalInfo: yup.string(),
  service: yup.number(),
  toDo: yup.number(),
});
