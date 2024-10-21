import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { getAllAmountMonthExpenses } from "../../helper/helperExpense";

const chartSetting = {
  yAxis: [
    {
      label: "Total Expenses (Amount)",
      fontSize: 14,
    },
  ],
  width: 700,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function BarsDataset() {
  const [expensesData, setExpensesData] = useState([]);

  // Fetch the expenses from the backend
  useEffect(() => {
    try {
      const createPromise = getAllAmountMonthExpenses();
      createPromise
        .then(({ expenses }) => {
          const data = transformExpensesData(expenses);
          setExpensesData(data);
          console.log(expenses);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, []);

  // Function to transform expenses data into the format required by the BarChart
  const transformExpensesData = (expenses) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Initialize the structure for the chart
    const dataByMonth = months.map((month, index) => ({
      month,
      nourriture: 0,
      transport: 0,
      divertissement: 0,
      loyer: 0,
      autre: 0,
    }));

    // Populate the chart data
    expenses.forEach(({ _id, totalAmount }) => {
      const monthIndex = _id.month - 1; // Convert month (1-12) to array index (0-11)
      dataByMonth[monthIndex][_id.category] = totalAmount;
    });

    return dataByMonth;
  };

  return (
    <section
      className="py-1 bg-blueGray-50 h-auto ml-5"
      style={{
        overflow: "auto",
      }}
    >
        <BarChart
      dataset={expensesData}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "nourriture", label: "Nourriture" },
        { dataKey: "transport", label: "Transport" },
        { dataKey: "loisirs", label: "loisirs" },
      ]}
      {...chartSetting}
    />
    </section>
    
  );
}
