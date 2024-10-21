import mongoose from 'mongoose';

// Define the schema for Depense
const depenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'], // Custom error message
    min: [0, 'Amount cannot be negative'], // Minimum validation
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['nourriture', 'loisirs', 'transport', 'divertissement', 'autre'], // Example categories
  },
  note: {
    type: String,
    trim: true, // Removes leading/trailing spaces
    maxlength: [200, 'Note cannot exceed 200 characters'],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Date is required'], // Custom error message
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
    required: true, // Ensure every expense is associated with a user
  }
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the Depense model from the schema
export default mongoose.model('Expense', depenseSchema);

