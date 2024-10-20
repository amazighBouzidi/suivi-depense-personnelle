import React from "react";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal({ showModal, toggleModal, expense, addUpdateExpense }) {
  if (!showModal) return null;

  return (
    <div
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
                  { addUpdateExpense === 'add' ? 'Ajouter Une Dépense' : 'Modifier Une Dépense' } 
                </h3>
                <div className="mt-2">
                  <ExpenseForm toggleModal={toggleModal} expense={expense} addUpdateExpense={addUpdateExpense} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
