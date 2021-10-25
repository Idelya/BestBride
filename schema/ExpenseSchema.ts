import * as yup from "yup";

export const initialValues = {
  name: "",
  price: 0,
  paymentDate: undefined,
  finalDate: undefined,
  status: "zaplanowane",
  estiamtedPrice: 0,
  type: undefined,
  remarks: "",
  service: undefined,
  task: undefined,
};

export const expenseSchemaValidation: any = yup.object({
  name: yup.string(),
  price: yup.number(),
  paymentDate: yup.date(),
  finalDate: yup.date(),
  status: yup.string(),
  estiamtedPrice: yup.number(),
  type: yup.string(),
  remarks: yup.string(),
  service: yup.number(),
  task: yup.number(),
});
