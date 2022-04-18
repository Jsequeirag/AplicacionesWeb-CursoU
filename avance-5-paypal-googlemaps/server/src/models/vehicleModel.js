const { Schema, model } = require("mongoose");
const vehicleSchema = new Schema(
  {
    idvehicleowner: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    platenumber: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    valoration: {
      type: Number,
      required: false,
    },

    location: { type: String, required: false },
    drivers: {
      type: [],
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const vehicleModel = model("vehicle", vehicleSchema);
module.exports = vehicleModel;
