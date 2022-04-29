/* --------------------------------- packages -------------------------------- */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
/* ------------------------------- middlewares ------------------------------ */
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */
/*                                   routes                                   */
/* -------------------------------------------------------------------------- */
/* ------------------------------- authroutes ------------------------------- */
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
/* ------------------------------ vehicleRoutes ----------------------------- */
const vehicleRoutes = require("./routes/vehiclesRoutes");
app.use("/vehicle/", vehicleRoutes);
/* ------------------------------ driverRoutes ------------------------------ */
const driverRoutes = require("./routes/driverRoutes");
app.use("/driver", driverRoutes);
/* ------------------------------ invoiceRoutes ----------------------------- */
const invoiceRoutes = require("./routes/invoiceRoutes");
app.use("/invoices", invoiceRoutes);
/* ------------------------------ paypayRoutes ------------------------------ */
const paypayRoutes = require("./routes/paypalRoutes");
app.use("/paypal", paypayRoutes);
/* ------------------- database connection and server run ------------------- */

mongoose
  .connect(process.env.MONGOATLAS)
  .then(() => {
    app.listen(3000, () => {
      console.log("SERVER:3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
