import * as yup from "yup";

export const initialValues = {
  name: "",
  status: "nierozpoczęte",
  date: null,
  assignedTo: null,
  expanses: null,
  remarks: "",
};

export const taskStatusOptions = ["nierozpoczęte", "w trakcie", "zakończone"];

export const taskSchemaValidation: any = yup.object({
  name: yup.string().required(),
  status: yup.string(),
  date: yup.date(),
  assignedTo: yup.number(),
  expanses: yup.number(),
  remarks: yup.string(),
});
