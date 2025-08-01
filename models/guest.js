import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50  
  },
  uploads: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  }
}, {
  timestamps: true 
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
