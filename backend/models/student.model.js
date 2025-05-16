const mongoose = require("mongoose");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
    },
    firstname: {
      type: String,
      trim: true,
      required: [true, "Firstname is required field"],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "Lastname is required field"],
    },
    vat: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Vat is required field"],
    },
    fathername: {
      type: String,
      trim: true,
      required: [true, "Fathername is required field"],
    },
    phoneNum: {
      type: String,
      trim: true,
      required: [true, "Phone number is required field"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Email has not valid format"],
    },
    zipcode: {
      type: String,
      trim: true,
      required: [true, "Zipcode is required field"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required field"],
    },
    streetNum: {
      type: String,
      trim: true,
      required: [true, "Street number is required field"],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: [true, "City is required"],
    },
  },
  {
    timestamps: true,
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentSchema);
