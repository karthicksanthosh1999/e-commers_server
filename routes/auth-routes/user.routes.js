const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  authMiddleware,
} = require("../../controllers/auth/auth.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/auth-check", authMiddleware, checkAuth);

module.exports = userRouter;
