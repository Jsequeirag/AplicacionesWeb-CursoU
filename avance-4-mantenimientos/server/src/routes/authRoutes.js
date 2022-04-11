const router = require("express").Router();
const { verifyToken, isDriver } = require("../middlewares/jwtAuth");
const authController = require("../controllers/authController.js");
router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.put("/update/:id", [verifyToken], authController.update);
router.post("/getuserbyid/", [verifyToken], authController.getUserById);
module.exports = router;
