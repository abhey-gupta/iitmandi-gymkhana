const mongoose = require("mongoose");
require("../lib/mongoose");
const SocietySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Society", SocietySchema);
