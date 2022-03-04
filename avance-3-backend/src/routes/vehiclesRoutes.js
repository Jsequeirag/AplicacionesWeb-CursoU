const vehicleController = require("../controllers/vehicleController");
router = require("express").Router();

router.get("/", vehicleController.getVehicles);
router.post("/", vehicleController.createVehicle);
router.delete("/:id", vehicleController.deleteVehicleById);
router.put("/:id", vehicleController.updateVehicleById);

module.exports = router;
