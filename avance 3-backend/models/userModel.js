const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    location: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const userModel = model("user", userSchema);
module.exports = userModel;
