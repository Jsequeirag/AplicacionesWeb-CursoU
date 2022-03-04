const vehicleModel = require("../models/vehicleModel");

const createVehicle = async (req, res) => {
  const vehicle = await vehicleModel.findOne({
    platenumber: req.body.platenumber,
  });
  console.log(vehicle);
  if (vehicle) return res.status(401).json({ message: "Vehiculo existente" });

  const newVehicle = new vehicleModel(req.body);
  const vehicleSaved = await newVehicle.save();
  res.status(200).json(vehicleSaved);
};
const getVehicles = async (req, res) => {
  const vehicles = await vehicleModel.find();
  res.status(200).json(vehicles);
};
const deleteVehicleById = async (req, res) => {
  console.log("asd");
  const vehicleDeleted = await vehicleModel.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(vehicleDeleted);
};
const updateVehicleById = async (req, res) => {
  const vehicleUpdated = await vehicleModel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );
  res.status(200).json(vehicleUpdated);
};
module.exports = {
  createVehicle,
  getVehicles,
  deleteVehicleById,
  updateVehicleById,
};
