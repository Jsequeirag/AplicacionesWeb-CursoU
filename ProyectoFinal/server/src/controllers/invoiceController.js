const invoiceModel = require("../models/invoiceModel");

const createinvoice = async (req, res) => {
  try {
    const newInvoice = new invoiceModel(req.body);
    const invoiceSaved = await newInvoice.save();
    res.status(200).json(invoiceSaved);
  } catch (e) {
    res.status(500).res.json({
      message: "Server error",
    });
  }
};
const getInvoicesbyUserId = async (req, res) => {
  try {
    const invoices = await invoiceModel
      .find({ idclient: req.params.id })
      .populate("idclient")
      .populate("idvehicleowner")
      .populate("idvehicle");
    res.status(200).json(invoices);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error 500" });
  }
};
const getInvoices = async (req, res) => {
  const invoices = await invoiceModel.find();
  res.status(200).json(invoices);
};
const deleteInvoiceById = async (req, res) => {
  console.log("asd");
  const invoiceDeleted = await invoiceModel.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(invoiceDeleted);
};
const updateInvoiceById = async (req, res) => {
  const invoiceUpdated = await invoiceModel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );
  res.status(200).json(invoiceUpdated);
};
module.exports = {
  createinvoice,
  getInvoices,
  deleteInvoiceById,
  updateInvoiceById,
  getInvoicesbyUserId,
};
