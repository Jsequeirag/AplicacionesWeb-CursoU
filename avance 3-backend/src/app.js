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
/* ------------------- database connection and server run ------------------- */
mongoose
  .connect(process.env.MONGOATLAS, { useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("3000");
    });
  });
