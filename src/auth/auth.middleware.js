const jwt = require("jsonwebtoken");
const conf = require("../config/config");
const verifyToken = (token, secreteKey) => {
  return jwt.verify(token, secreteKey);
};

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token, conf.jwt.secretKey);

    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error in authentication",
    });
  }
};
module.exports = { authenticate };
