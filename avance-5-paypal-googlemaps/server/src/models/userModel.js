const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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
    roles: { type: String, required: true },
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

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  return passwordEncrypted;
};
userSchema.statics.comparePassword = async (password, hashedPassword) => {
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};
const userModel = model("user", userSchema);
module.exports = userModel;
