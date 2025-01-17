const mongoose = require("mongoose");
require("../lib/mongoose");
const SocietyMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    society: { type: String, required: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    monthly_expense: { type: Object, default: {} },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("SocietyMember", SocietyMemberSchema);
