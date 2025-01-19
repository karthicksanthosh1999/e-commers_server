const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// Register

const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already existing",
        statusCode: 400,
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, userName });
    await newUser.save();

    res.status(201).json({
      message: "User Register Successfully",
      success: true,
      statusCode: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

module.exports = { registerUser };
