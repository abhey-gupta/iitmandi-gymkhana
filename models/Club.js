const mongoose = require("mongoose");
require("../lib/mongoose");
const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    society: { type: String, required: true },
    monthly_expense: { type: Object, default: {} },
    description: { type: String },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Club", ClubSchema);
