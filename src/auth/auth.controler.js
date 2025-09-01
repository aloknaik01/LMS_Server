const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conf = require("../config/config");

//register api
const registerUser = async (req, res) => {
  //getting data from user/body.
  const { userName, userEmail, password, role } = req.body;

  //checkig all fields
  if (!userName || !userEmail || !password || !role) {
    return res.status(400).json({
      sucess: false,
      message: "All fields are required!",
    });
  }

  //checking existing user
  const ckeckExisingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (ckeckExisingUser) {
    return res.status(400).json({
      sucess: false,
      message: "Username or useremail already exists !",
    });
  }

  // password hashing
  const hashPassword = await bcrypt.hash(password, 12);

  //creating new user
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  //saving user in db
  await newUser.save();

  //returning response
  return res.status(201).json({
    sucess: true,
    message: "User registered successfully!",
  });
};

//Login api
const login = async (req, res) => {
  console.log();
  //getting data from user/body.
  const { userEmail, password } = req.body;

  //checkig all fields
  if (!userEmail || !password) {
    return res.status(400).json({
      sucess: false,
      message: "Email and password are required!",
    });
  }

  //checking existing user
  const isUserExist = await User.findOne({ userEmail }).select("+password");

  // comparing password
  if (!isUserExist || (await bcrypt.compare(isUserExist.password, password))) {
    return res.status(401).json({
      sucess: false,
      message: "Invalid credentials!",
    });
  }

  //jwt access token
  const accessToken = jwt.sign(
    {
      _id: isUserExist._id,
      userName: isUserExist.userName,
      userEmail: isUserExist.userEmail,
      role: isUserExist.role,
    },
    conf.jwt.secretKey,
    {
      expiresIn: conf.jwt.expires,
    }
  );

  //return response
  return res.status(200).json({
    success: true,
    message: "Legged in successfully.",
    data: {
      accessToken,
      user: {
        _id: isUserExist._id,
        userName: isUserExist.userName,
        userEmail: isUserExist.userEmail,
        role: isUserExist.role,
      },
    },
  });
};

module.exports = { registerUser, login };
