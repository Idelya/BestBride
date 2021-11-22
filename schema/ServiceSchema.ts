import * as yup from "yup";

export let schema = yup.object().shape({
  name: yup.string().required("Nazwa jest obligatoryjna."),
  category: yup.number().required(),
  contact: yup
    .object()
    .shape({
      email: yup
        .string()
        .email()
        .test(
          "required email",
          "Należy podać przynajmniej jedną daną kontaktową: numer telefonu, email lub link so strony",
          function (value) {
            const { phone, url } = this.parent;
            if (!phone && !url) return !!value;
            return true;
          }
        ),
      phone: yup
        .string()
        .test(
          "required phone",
          "Należy podać przynajmniej jedną daną kontaktową: numer telefonu, email lub link so strony",
          function (value) {
            const { email, url } = this.parent;
            if (!email && !url) return !!value;
            return true;
          }
        ),
      url: yup
        .string()
        .test(
          "required url",
          "Należy podać przynajmniej jedną daną kontaktową: numer telefonu, email lub link do strony",
          function (value) {
            const { email, phone } = this.parent;
            if (!email && !phone) return !!value;
            return true;
          }
        ),
    })
    .required("Kontakt jest obligatoryjny."),
  details: yup.string().required("Opis oferty jest obligatoryjny."),
  detailsStyle: yup.string().required("Opis oferty jest obligatoryjny."),
});
