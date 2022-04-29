const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    idclient: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    idvehicleowner: {
      ref: "user",
      type: Schema.Types.ObjectId,
      required: true,
    },
    idvehicle: {
      ref: "vehicle",
      type: Schema.Types.ObjectId,
      required: true,
    },
    destination: {
      type: Object,
      required: true,
    },
    origin: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      require: true,
    },
    valoration: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true, versionKey: false }
);

const modelInvoice = model("invoice", invoiceSchema);
module.exports = modelInvoice;
