const express = require("express");
require("dotenv").config();
const { verifyToken, isRider } = require("../middlewares/jwtAuth");
const router = express.Router();
const {
  cancelOrder,
  captureOrder,
  createOrder,
} = require("../controllers/paypalController");

router.post("/create-order", [verifyToken, isRider], createOrder);
router.get("/capture-order", captureOrder);
router.get("/cancel-order", cancelOrder);

module.exports = router;
