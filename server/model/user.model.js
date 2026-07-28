const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyTokenExpirey: { type: Date },
    role: {
      type: String,
      enum: ['attendee', 'organizer', 'admin'],
      default: 'attendee',
    },
  },
  { timestamps: true }
);
//model create krna hain using the schema
const User = mongoose.model('User', userSchema);
 
module.exports = User;