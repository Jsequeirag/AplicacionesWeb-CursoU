const vehicleController = require("../controllers/vehicleController");
router = require("express").Router();
const { verifyToken, isDriver, isRider } = require("../middlewares/jwtAuth");

router.get("/", vehicleController.getVehicles);
router.get(
  "/getvehiclesbystatus",
  [verifyToken, isRider],
  vehicleController.getVehiclesByStatus
);
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
