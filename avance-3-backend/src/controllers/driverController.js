const driverModel = require("../models/driverModel");

const createDriver = async (req, res) => {
  const driver = await driverModel.findOne({
    identification: req.body.identification,
  });
  console.log(driver);
  if (driver) return res.status(401).json({ message: "Chofer existente" });

  const newDriver = new driverModel(req.body);
  const driverSaved = await newDriver.save();
  res.status(200).json(driverSaved);
};
const getDrivers = async (req, res) => {
  const drivers = await driverModel.find();
  res.status(200).json(drivers);
};
const deleteDriverById = async (req, res) => {
  console.log("asd");
  const driverDeleted = await driverModel.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(driverDeleted);
};
const updateDriverById = async (req, res) => {
  const driverDeleted = await driverModel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );
  res.status(200).json(driverDeleted);
};
module.exports = {
  createDriver,
  getDrivers,
  deleteDriverById,
  updateDriverById,
};
