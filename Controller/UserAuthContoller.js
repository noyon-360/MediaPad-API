const UserModel = require("../Models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password doesn't match", success: false });
    }

    const newUser = new UserModel({ name, email, password });

    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    await newUser.save();

    return res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      name: user.name, 
      email: user.email,
      token: token,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
