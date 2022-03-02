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
      required: true,
    },

    location: { type: String, required: true },
    drivers: {
      type: [],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

vehicleModel