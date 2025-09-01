const User = require("../User/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  if (!userName || !userEmail || !password || !role) {
    return res.status(400).json({
      sucess: false,
      message: "All fields are required!",
    });
  }

  const ckeckExisingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (ckeckExisingUser) {
    return res.status(400).json({
      sucess: false,
      message: "Username or useremail already exists !",
    });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    sucess: true,
    message: "User registered successfully!",
  });
};

module.exports = { registerUser };
