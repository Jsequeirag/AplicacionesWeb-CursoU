const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    const user = await userModel.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "user doesn't exits" });
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isDriver = async (req, res, next) => {
  const user = await userModel.findById(req.userId);
  console.log(user);
  if (!user.roles == "driver")
    return res.status(403).json({ message: "Rol doesn't authorize" });
  next();
};

module.exports = { verifyToken, isDriver };
