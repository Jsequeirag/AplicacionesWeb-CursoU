const userModel = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const signin = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(401) //401 no retorna nada
        .json({ message: "Usuario no registrado", auth: false });

    console.log(user.password, req.body.password);
    const comparedPassword = await userModel.comparePassword(
      req.body.password,
      user.password
    );
    console.log(comparedPassword);
    if (!comparedPassword)
      return res
        .status(401)
        .json({ message: "contraseña incorrecta", auth: false });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60,
    });
    res.status(200).json({ user, auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 500 });
  }
};

const signup = async (req, res) => {
  const username = await userModel.findOne({ username: req.body.username });
  if (username)
    return res.status(200).json({ message: "Usuario registrado", auth: false });

  const newUser = new userModel(req.body);
  newUser.password = await userModel.encryptPassword(newUser.password);

  const usersaved = await newUser.save();
  const token = jwt.sign({ id: usersaved._id }, process.env.SECRET, {
    expiresIn: 24 * 60 * 60,
  });
  res.status(200).json({ usersaved, token, auth: true });
};
const update = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log(user);
  res.status(200).json(user);
};
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.body._id);
  console.log(user);
  res.status(200).json(user);
};
module.exports = { signin, signup, update, getUserById };
