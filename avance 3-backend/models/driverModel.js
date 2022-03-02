const { Schema, model } = require("mongoose");

const driverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    identification: {
      type: Number,
      require: true,
    },

    birthdate: {
      type: Date,
      required: true,
    },
    licenseclass: {
      type: String,
      require: true,
    },
    explicense: {
      type: Date,
      required: true,
    },
    iduser: { ref: "user", type: Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);
const driverModel = model("driver", driverSchema);
module.exports = driverModel;
