import * as Yup from "yup";

const validationSchemaExpense = Yup.object({
  amount: Yup.number()
    .required("Montant est requis")
    .positive("Le montant doit être positif"),
  category: Yup.string().required("Catégorie est requise"),
  note: Yup.string(),
});

export default validationSchemaExpense;
