import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { getAllAmountYearExpensesByYear } from "../../helper/helperExpense";

export default function PieActiveArc() {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const valueFormatter = (item) => `${item.value}%`; // Define valueFormatter here

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const createPromise = getAllAmountYearExpensesByYear();
        createPromise
          .then(({ expenses }) => {
            console.log("by year", expenses);
            // Transform data to match PieChart requirements
            const formattedData = expenses.map((expense) => ({
              label: expense._id.category, // Use category as label
              value: expense.totalAmount, // Use totalAmount as value
            }));

            setExpensesData(formattedData);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <PieChart
        series={[
          {
            data: expensesData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter, // Use the defined valueFormatter directly
          },
        ]}
        height={200}
      />
     <h1 className="text-center">Charts - Pie</h1>
    </div>
  );
}
