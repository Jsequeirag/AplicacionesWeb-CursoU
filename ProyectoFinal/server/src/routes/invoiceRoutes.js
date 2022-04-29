router = require("express").Router();
const { verifyToken, isRider } = require("../middlewares/jwtAuth");
const invoiceController = require("../controllers/invoiceController");
router.get(
  "/:id",
  [verifyToken, isRider],
  invoiceController.getInvoicesbyUserId
);
router.post("/", invoiceController.createinvoice);
router.get("/", invoiceController.getInvoices);
router.delete("/:id", invoiceController.deleteInvoiceById);
router.put("/:id", invoiceController.updateInvoiceById);

module.exports = router;
