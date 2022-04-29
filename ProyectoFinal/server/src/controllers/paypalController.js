const axios = require("axios");
const invoiceModel = require("../models/invoiceModel");
require("dotenv").config();
var PAYPAL_API = process.env.PAYPAL_API;
var PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
var PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;

var userInfo;
var driverInfo;
var vehicleInfo;
var travelInfo;

const createOrder = async (req, res) => {
  try {
    vehicleInfo = req.body.vehicle;
    driverInfo = req.body.driver;
    travelInfo = req.body.travelInfo;
    userInfo = req.body.user;
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: travelInfo.cost,
          },
          description: "Ebur travel",
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3000/paypal/capture-order",
        cancel_url: "http://localhost:3000/paypal/cancel-order",
      },
    };
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const token = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: { "Content-Type": " x-www-form-urlencoded" },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    console.log(response.data);
    res.send(response.data);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something goes wrong");
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    if ((response.data.status = "COMPLETED")) {
      const newInvoice = new invoiceModel({
        amount: travelInfo.cost,
        idclient: userInfo._id,
        idvehicleowner: vehicleInfo.idvehicleowner,
        idvehicle: vehicleInfo._id,
        destination: travelInfo.destination,
        origin: travelInfo.userPosition,
        date: new Date().toDateString(),
        valoration: 5,
      });
      await newInvoice.save();
    }
    console.log(response.data);
    res.redirect("http://localhost:4200/dashboard/valoration");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
const cancelOrder = (req, res) => {};
module.exports = {
  captureOrder,
  cancelOrder,
  createOrder,
};
