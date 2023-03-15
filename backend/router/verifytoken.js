const jwt = require("jsonwebtoken");
const jwtKey = "2903asdkj#$@98fe 324@@!";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, jwtKey, (err, user) => {
      if (err) {
        return res.status(400).json("Some error occured");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json("Access token is not valid");
  }
};

module.exports = { verifyToken };
