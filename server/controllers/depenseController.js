import User from "../models/User.model.js";
import Depense from "../models/Depense.model.js";

export async function getAllExepenses(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const expenses = await Depense.find(); // Fetch all expenses from the database
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
            });

            await expense.save();

            res.status(201).json({ msg: 'Catégorie ajoutée avec succès' });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error adding category:', error);
        return res.status(500).send({ error: error.message });
    }
}

export async function UpdateExpense(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const { updateExpense } = req.body; // Expecting newExpense with id
            console.log('update Expense', updateExpense);

            // Find and update the expense by ID
            const updatedExpense = await Depense.findById(updateExpense._id)

            if (!updatedExpense) {
                return res.status(404).json({ error: "Expense not found" });
            }
            const category = updateExpense.category
            await Depense.updateOne(
                { _id: updatedExpense._id },
                { $set: { 
                    amount: updateExpense.amount,
                    category: category,
                    note: updateExpense.note,
                }}
            );

            console.log('Updated Expense: ', updatedExpense);
            res.status(200).json({ msg: 'Expense updated successfully', updatedExpense: updateExpense });
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error updating expense:', error);
        return res.status(500).send({ error: 'Erreur de connection, veuillez réessayer' });
    }
}

export async function deleteExpense(req, res) {
    try {
        const { userId } = req.user
        if (userId) {
            const { expenseId } = req.params;
            console.log('_id: ', expenseId);
            const expense = await Depense.findById(expenseId);
            if (expense) {
                await Depense.findByIdAndDelete(expenseId);
                res.status(200).json({ msg: 'Dépense Supprimer Avec Succes'});
            } else {
                return res.status(404).json({ error: "Dépense Not Found...!" });
            }
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        console.error('Error deleting adepense:', error);
        return res.status(500).send({ error: 'Erreur de connection, veuillez réessayer' });
    }
}


