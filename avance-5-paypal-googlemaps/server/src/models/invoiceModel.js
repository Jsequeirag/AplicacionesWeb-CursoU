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
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      require: true,
    },
    valoration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const modelInvoice = model("invoice", invoiceSchema);
module.exports = modelInvoice;
