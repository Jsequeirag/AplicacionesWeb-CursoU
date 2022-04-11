const vehicleController = require("../controllers/vehicleController");
router = require("express").Router();
const { verifyToken, isDriver } = require("../middlewares/jwtAuth");
router.get("/", vehicleController.getVehicles);
router.get("/:id", [verifyToken, isDriver], vehicleController.getVehicles);
router.post("/", [verifyToken, isDriver], vehicleController.createVehicle);
router.delete(
  "/:id",
  [verifyToken, isDriver],
  vehicleController.deleteVehicleById
);
router.put(
  "/:id",
  [verifyToken, isDriver],
  vehicleController.updateVehicleById
);

module.exports = router;
