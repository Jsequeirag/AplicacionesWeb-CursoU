const { Schema, model } = require("mongoose");
const vehicleSchema = new Schema(
  {
    idvehicleowner: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    platenumber: {
      type: String,
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
      default: 5,
    },

    location: { type: Object, default: { lat: 10.466057, lng: -84.636698 } },
    drivers: {
      type: [],
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const vehicleModel = model("vehicle", vehicleSchema);
module.exports = vehicleModel;
