import React from "react";
import { useFormik } from "formik";
import validationSchemaExpense from "../../utils/validationSchemaExepense";
import { AddExpense } from "../../helper/helperExpense";
import toast, { Toaster } from "react-hot-toast";
import { UpdateExpense } from "../../helper/helperExpense";

export default function ExpenseForm({
  toggleModal,
  addUpdateExpense,
  expense,
}) {
  const formik = useFormik({
    initialValues: {
      amount: addUpdateExpense === "update" ? expense?.amount : "",
      category: addUpdateExpense === "update" ? expense?.category : "",
      note: addUpdateExpense === "update" ? expense?.note : "",
    },
    validationSchema: validationSchemaExpense, // Add validation schema here
    onSubmit: (values) => {
      if (addUpdateExpense === "add") {
        const createPromise = AddExpense(values);

        createPromise
          .then(({ msg }) => {
            const expense = values;
            toggleModal("show", expense);
          })
          .catch(({ error }) => {
            toast.error("Erreur lors de l'ajout de la dépense"); // Affiche le message d'erreur en cas d'échec
          });
      }
      if (addUpdateExpense === "update") {
        const newValues = {
          _id: expense._id,  // Add _id from expense
          ...values          // Add all key-value pairs from values
        }
        const createPromise = UpdateExpense(newValues);

        createPromise
          .then(({ msg, updatedExpense }) => {
            toggleModal("update", updatedExpense);
          })
          .catch(({ error }) => {
            toast.error("Erreur lors de la modification de la dépense"); // Affiche le message d'erreur en cas d'échec
          });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
      {/* Amount and Category in one row */}
      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Montant
          </label>
          <input
            type="number"
            {...formik.getFieldProps("amount")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {/* Display error message for amount */}
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-red-500 text-sm">{formik.errors.amount}</div>
          ) : null}
        </div>
        <div className="flex flex-col w-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Categorie
          </label>
          <select
            {...formik.getFieldProps("category")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Selectionner une catégorie</option>
            <option value="nourriture">Nourriture</option>
            <option value="transport">Transport</option>
            <option value="loisirs">Loisirs</option>
          </select>
          {/* Display error message for category */}
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          ) : null}
        </div>
      </div>

      {/* Note Input full width */}
      <div className="flex flex-col w-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Note
        </label>
        <textarea
          {...formik.getFieldProps("note")}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      {/* Buttons aligned to the right */}
      <div className="flex justify-end gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={toggleModal}
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
