const { get } = require("mongoose");
const vehicleModel = require("../models/vehicleModel");
/* ------------------------------ createVehicle ----------------------------- */
const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleModel.findOne({
      platenumber: req.body.platenumber,
    });
    console.log(vehicle);
    if (vehicle) return res.status(401).json({ message: "Vehiculo existente" });

    const newVehicle = new vehicleModel(req.body);
    const vehicleSaved = await newVehicle.save();
    res.status(200).json(vehicleSaved);
  } catch (e) {
    res.status(500).json({
      message: "server error 500",
    });
  }
};
/* ------------------------------- getVehicles ------------------------------ */
const getVehicles = async (req, res) => {
  const vehicles = await vehicleModel.find();
  res.status(200).json(vehicles);
};
/* ----------------------------- getVehiclesById ---------------------------- */
const getVehiclesById = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find({ idvehicleowner: req.body.id });
    res.status(200).json(vehicles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messaje: "server error" });
  }
};
/* ---------------------------- deleteVehicleById --------------------------- */
const deleteVehicleById = async (req, res) => {
  console.log("asd");
  const vehicleDeleted = await vehicleModel.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json(vehicleDeleted);
};
/* ---------------------------- updateVehicleById --------------------------- */
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
/* --------------------------- getVehiclesByStatus -------------------------- */
const getVehiclesByStatus = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find({ status: true });

    vehicles.map((vehicle, index) => {
      driver = vehicle.drivers.find((driver) => (driver.status = true));
      vehicles[index].drivers = [driver];
    });

    res.status(200).json(vehicles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messaje: "server error" });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehiclesById,
  deleteVehicleById,
  updateVehicleById,
  getVehiclesByStatus,
};
