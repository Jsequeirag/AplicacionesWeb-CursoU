const driverController = require("../controllers/driverController");
router = require("express").Router();
router.post("/", driverController.createDriver);
router.get("/", driverController.getDrivers);
router.delete("/:id", driverController.deleteDriverById);
router.put("/:id", driverController.updateDriverById);

module.exports = router;
