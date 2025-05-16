const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "cities",
  }
);

module.exports = mongoose.model("City", citySchema);
