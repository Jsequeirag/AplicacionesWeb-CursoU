const driverController = require("../controllers/driverController");
const { verifyToken, isDriver } = require("../middlewares/jwtAuth");
router = require("express").Router();
router.post("/", [verifyToken, isDriver], driverController.createDriver);
router.get("/", driverController.getDrivers);
router.get("/:id", [verifyToken, isDriver], driverController.getDrivers);
router.delete(
  "/:id",
  [verifyToken, isDriver],
  driverController.deleteDriverById
);
router.put("/:id", [verifyToken, isDriver], driverController.updateDriverById);

module.exports = router;
