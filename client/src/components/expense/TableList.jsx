import React, { useEffect } from "react";
import { getALlExpenses } from "../../helper/helperExpense";
import toast, { Toaster } from "react-hot-toast";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import ExpenseModal from "./ExpenseModal";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import ExpenseModalDelete from "./ExpenseModalDelete";

export default function TableList() {
  const [expenses, setExpenses] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [addUpdateExpense, setAddUpdateExpense] = React.useState("add");
  const [expenseToUpdate, setExpenseToUpdate] = React.useState({});

  const toggleModal = (showing, expense) => {
    setShowModal(!showModal);
    if (showing === "show") {
      toast.success("Dépense ajouter avec succès!");
      setExpenses([...expenses, expense]);
    }

    if (showing === "update") {
      toast.success("Dépense modifiée avec succès!");
      console.log("Expenses", expense);
      setExpenses(
        expenses.map((exp) => (exp._id === expense._id ? expense : exp))
      );
    }
  };

  const toggleModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const handleDelete = (showing, expenseD) => {
    if (showing === "delete") {
      toast.success("Dépense supprimer avec succès!");
      const updatedExpenses = expenses.filter(
        (expense) => expense._id !== expenseD._id
      );
      setExpenses(updatedExpenses);
    }
  };

  const categories = ["nourriture", "transport", "loisirs"];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.note.toLowerCase().includes(searchFilter.toLowerCase()) ||
      expense.amount.toString().includes(searchFilter) ||
      new Date(expense.date).toLocaleDateString().includes(searchFilter);

    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const createPromise = getALlExpenses();
    createPromise
      .then(({ expenses }) => {
        setExpenses(expenses);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to load expenses");
      });
  }, []);

  return (
    <section
      className="py-1 bg-blueGray-50 h-auto"
      style={{
        overflow: "auto",
      }}
    >
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-14">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="block w-full overflow-x-auto p-4">
            <div className="mb-5 flex flex-wrap gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Search by amount, date or note"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex-none">
                {/* Updated Category Listbox */}
                <Listbox value={categoryFilter} onChange={setCategoryFilter}>
                  <div className="relative">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      {categoryFilter || "Filter par Categorie"}
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </ListboxButton>
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <ListboxOption value="">
                        <span className="ml-3 block truncate">
                          Filter par Categorie
                        </span>
                      </ListboxOption>
                      {categories.map((category, index) => (
                        <ListboxOption
                          key={index}
                          value={category}
                          className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                        >
                          <span className="ml-3 block truncate">
                            {category}
                          </span>
                          {category === categoryFilter && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </span>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
              <div className="flex-none">
                <div>
                  <button
                    onClick={() => {
                      setAddUpdateExpense("add");
                      toggleModal();
                    }}
                    className="flex w-50 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Ajouter
                  </button>

                  <ExpenseModal
                    expense={expenseToUpdate}
                    addUpdateExpense={addUpdateExpense}
                    showModal={showModal}
                    toggleModal={toggleModal}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Montant
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Categorie
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Note
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${expense.amount}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {expense.category}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {expense.note}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">
                          <MdDelete
                            style={{
                              width: "15%",
                              height: "10%",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => toggleModalDelete("show", expense)}
                          />
                          <TbEdit
                            style={{
                              width: "15%",
                              height: "10%",
                              color: "green",
                              cursor: "pointer",
                              marginLeft: "3px",
                            }}
                            onClick={() => {
                              setAddUpdateExpense("update");
                              setExpenseToUpdate(expense);
                              toggleModal();
                            }}
                          />
                        </div>
                      </td>
                      {showModalDelete && (
                        <ExpenseModalDelete
                          expense={expense} // Find the expense to show
                          showModal={showModalDelete}
                          toggleModal={toggleModalDelete}
                          onDelete={handleDelete}
                        />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    </section>
  );
}
