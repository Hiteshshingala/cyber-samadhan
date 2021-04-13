const jwt = require("jsonwebtoken");
const constant = require('../config/constant')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decord = jwt.verify(token, constant.JWT_SECRET);
    req.userData = decord;
    next();
  } catch (error) {
    return res.status(401).json({
      message: constant.AUTH_FAILED
    });
  }
};