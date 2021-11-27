import * as yup from "yup";

export const initialValues = {
  budget: 0,
  plannedGuestAmmount: 0,
};

export const weddingSchemaValidation: any = yup.object({
  budget: yup.number(),
  plannedGuestAmmount: yup.number(),
});
