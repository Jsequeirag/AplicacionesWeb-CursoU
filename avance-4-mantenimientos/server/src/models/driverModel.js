const { Schema, model } = require("mongoose");

const driverSchema = new Schema(
  {
    name: {
      type: String,
      require: false,
    },
    lastname: {
      type: String,
      require: false,
    },
    identification: {
      type: Number,
      require: false,
    },

    birthdate: {
      type: Date,
      require: false,
    },
    licenseclass: {
      type: String,
      require: false,
    },
    explicense: {
      type: Date,
      require: false,
    },
    iduser: { ref: "user", type: Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);
const driverModel = model("driver", driverSchema);
module.exports = driverModel;
