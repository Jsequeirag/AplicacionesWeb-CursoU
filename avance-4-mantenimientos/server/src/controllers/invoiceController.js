const invoiceModel = require("../models/invoiceModel");

const createinvoice = async (req, res) => {
  const newInvoice = new invoiceModel(req.body);
  const invoiceSaved = await newInvoice.save();
  res.status(200).json(invoiceSaved);
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
};
