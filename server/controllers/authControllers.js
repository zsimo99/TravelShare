import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password && !email) throw new Error("email:required,password:required");
  if (!email) throw new Error("email:required");
  if (!password) throw new Error("password:required");
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("email:notFound");
  }
  const correct = await user.comparePassword(password);
  if (!correct) {
    res.status(401);
    throw new Error("password:wronge");
  }
  const newUser = {
    email: user.email,
    displayName: user.displayName,
    id: user._id,
  };
  const token = await user.createJWT();
  res.status(200).json({ data: { userInfo: newUser, token } });
});

export const register = asyncHandler(async (req, res) => {
  const { displayName, email, password } = req.body;
  const user = await User.create({ displayName, email, password });
  const newUser = {
    email: user.email,
    displayName: user.displayName,
    id: user._id,
  };
  const token = await user.createJWT();

  res.status(201).json({ data: { userInfo: newUser, token } });
});
