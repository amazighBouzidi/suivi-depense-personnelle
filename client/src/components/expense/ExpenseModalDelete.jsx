import React from "react";
import { deleteExpense } from "../../helper/helperExpense";

export default function ExpenseModalDelete({
  showModal,
  toggleModal,
  onDelete,
  expense,
}) {
  if (!showModal) return null;

  const handleDelete = () => {
    const createPromise = deleteExpense(expense._id);

    createPromise
      .then(({ msg }) => {
        onDelete('delete', expense);
        toggleModal();
      })
      .catch(({ error }) => {
        console.error(error)
        toggleModal();
      });
  };

  return (
    <td
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen flex items-center justify-center overflow-y-auto">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="w-full">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Voulez-vous supprimer cette dépense ?
                </h3>
                <div className="mt-2">
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
                      onClick={handleDelete}
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </td>
  );
}
