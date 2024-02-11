const mongoose = require("mongoose");
require("../lib/mongoose");
const RequestSchema = new mongoose.Schema(
  {
    status: { type: String, default: "pending" },
    heading: { type: String, required: true },
    club: { type: String },
    recommendedBy: { type: Array, default: [] },
    member_id: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    total_amount: { type: String, required: true },
    purpose: { type: String, required: true },
    attachment: { type: String },
    bill_number: { type: String },
    name_of_supplier: { type: String },
    subcategory: { type: String },
    section: { type: String },
    budget_head: { type: String },
    passed_of_payment: { type: String },
    fund: { type: String },
    comments: { type: Array },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Request", RequestSchema);
