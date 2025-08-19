// models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: String,
  lastName: String,
  email: String,
  number: String,
  gender: String,
  dob: { day: String, month: String, year: String }, // ✅ object allowed
  profilePic: String,
});


export default mongoose.model("Profile", profileSchema);
