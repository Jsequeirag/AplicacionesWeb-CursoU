router = require("express").Router();
const invoiceController = require("../controllers/invoiceController");
router.post("/", invoiceController.createinvoice);
router.get("/", invoiceController.getInvoices);
router.delete("/:id", invoiceController.deleteInvoiceById);
router.put("/:id", invoiceController.updateInvoiceById);

module.exports = router;
