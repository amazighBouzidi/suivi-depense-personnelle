import React, { useEffect, useState } from "react";
import { getAllAmountMonthCurrentExpenses } from "../../helper/helperExpense";
import { FaUtensils, FaCar, FaSmile } from "react-icons/fa"; // Import icons

const categoryIcons = {
  nourriture: <FaUtensils className="text-4xl text-red-500" />,
  transport: <FaCar className="text-4xl text-blue-500" />,
  loisirs: <FaSmile className="text-4xl text-yellow-500" />,
};

export default function CategoriesAmountTotal() {
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { expenses } = await getAllAmountMonthCurrentExpenses();
        console.log("Expenses by category:", expenses);

        // Format the data
        const formattedData = expenses.map((expense) => ({
          label: expense._id.category, // Use category as label
          value: expense.totalAmount,  // Use totalAmount as value
        }));

        setExpensesData(formattedData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
      {expensesData.map((expense) => (
        <div
          key={expense.label}
          className="bg-white p-6 rounded-[24px] shadow-md flex flex-col items-center justify-center"
        >
          {/* Display category icon based on the category */}
          {categoryIcons[expense.label]}

          {/* Category name */}
          <h3 className="text-xl font-semibold mt-4 capitalize">{expense.label}</h3>

          {/* Total amount */}
          <p className="text-2xl font-bold text-gray-700 mt-2">
            {expense.value.toFixed(2)} DA {/* Assuming the currency is DA */}
          </p>
        </div>
      ))}
    </div>
  );
}

