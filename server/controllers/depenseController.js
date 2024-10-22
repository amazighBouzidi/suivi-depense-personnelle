import User from "../models/User.model.js";
import Depense from "../models/Depense.model.js";
import mongoose from "mongoose";

export async function getAllExepenses(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const expenses = await Depense.find({ user: userId }); // Fetch all expenses from the database
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
}

export async function AddExpense(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const { newExpense } = req.body;
      console.log(newExpense);

      const expense = new Depense({
        amount: newExpense.amount,
        category: newExpense.category,
        note: newExpense.note,
        user: userId, // Associate the expense with the user
      });

      await expense.save();

      res.status(201).json({ msg: "Catégorie ajoutée avec succès" });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).send({ error: error.message });
  }
}

export async function UpdateExpense(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const { updateExpense } = req.body; // Expecting newExpense with id
      console.log("update Expense", updateExpense);

      // Find and update the expense by ID
      const updatedExpense = await Depense.findById(updateExpense._id);

      if (!updatedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      const category = updateExpense.category;
      await Depense.updateOne(
        { _id: updatedExpense._id },
        {
          $set: {
            amount: updateExpense.amount,
            category: category,
            note: updateExpense.note,
          },
        }
      );

      console.log("Updated Expense: ", updatedExpense);
      res.status(200).json({
        msg: "Expense updated successfully",
        updatedExpense: updateExpense,
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error updating expense:", error);
    return res
      .status(500)
      .send({ error: "Erreur de connection, veuillez réessayer" });
  }
}

export async function deleteExpense(req, res) {
  try {
    const { userId } = req.user;
    if (userId) {
      const { expenseId } = req.params;
      console.log("_id: ", expenseId);
      const expense = await Depense.findById(expenseId);
      if (expense) {
        await Depense.findByIdAndDelete(expenseId);
        res.status(200).json({ msg: "Dépense Supprimer Avec Succes" });
      } else {
        return res.status(404).json({ error: "Dépense Not Found...!" });
      }
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.error("Error deleting adepense:", error);
    return res
      .status(500)
      .send({ error: "Erreur de connection, veuillez réessayer" });
  }
}

export async function getAllAmountMonthExpenses(req, res) {
  const { userId } = req.user;

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Aggregate query to group expenses by month and category, summing up the amounts
    const expenses = await Depense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // Match expenses for the logged-in user
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" }, // Extract the year from the date
            month: { $month: "$date" }, // Extract the month from the date
            category: "$category", // Group by category
          },
          totalAmount: { $sum: "$amount" }, // Sum the amount per category and month
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
    ]);

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: "No expenses found" });
    }

    // Return the aggregated results
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllAmountYearExpensesByYear(req, res) {
  const { userId } = req.user;

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Aggregate query to group expenses by year and category, summing up the amounts
    const expenses = await Depense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // Match expenses for the logged-in user
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" }, // Extract the year from the date
            category: "$category", // Group by category
          },
          totalAmount: { $sum: "$amount" }, // Sum the amount per category and year
        },
      },
      {
        $sort: { "_id.year": 1 }, // Sort by year
      },
    ]);

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: "No expenses found" });
    }

    // Return the aggregated results
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export async function getAllAmountMonthCurrentExpenses(req, res) {
  const { userId } = req.user;

  try {
    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the current year and month
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so add 1

    // Aggregate query to group expenses by current month, summing up the amounts
    const expenses = await Depense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId), // Match expenses for the logged-in user
          $expr: {
            $and: [
              { $eq: [{ $year: "$date" }, currentYear] }, // Match current year
              { $eq: [{ $month: "$date" }, currentMonth] }, // Match current month
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            category: "$category", // Group by category
          },
          totalAmount: { $sum: "$amount" }, // Sum the amount per category
        },
      },
      {
        $sort: { "_id.category": 1 }, // Sort by category
      },
    ]);

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: "No expenses found for the current month" });
    }

    // Return the aggregated results
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

