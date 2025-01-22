const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
      statusCode: 400,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        statusCode: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new User({ email, password: hashedPassword, userName });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      statusCode: 201,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      statusCode: 500,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill the all required fields!",
        success: false,
        statusCode: 400,
      });
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
        statusCode: 400,
      });
    }
    const matchedPassword = await bcrypt.compare(password, foundUser?.password);
    if (!matchedPassword) {
      return res.status(400).json({
        message: "Incorrect Password!",
        success: false,
        statusCode: 400,
      });
    }
    const token = await jwt.sign(
      {
        userName: foundUser?.userName,
        email: foundUser?.email,
        role: foundUser?.role,
      },
      "jwt-key",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      message: "User login successfully",
      success: true,
      statusCode: 200,
      data: {
        userName: foundUser?.userName,
        email: foundUser?.email,
        role: foundUser?.role,
        _id: foundUser?._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      statusCode: 500,
      error,
    });
  }
};

//Logout
const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    message: "User logout successfully",
    success: true,
    statusCode: 200,
  });
};

//Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        message: "Unauthrized User!",
        success: false,
        statusCode: 401,
      });
    }
    const decodedUser = await jwt.decode(token, "jwt-key");
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthrized User!",
      success: false,
      statusCode: 401,
    });
  }
};

//Check-Auth
const checkAuth = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "Authendicated User!",
    success: true,
    statusCode: 200,
    data: user,
  });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth,
};
