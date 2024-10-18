import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    default: ""
  },
  profile: { 
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountCreationDate: { 
    type: Date, 
    default: Date.now 
  },
  
});

export default mongoose.model('User', userSchema);