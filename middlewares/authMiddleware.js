const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        massage: "Authorization failed!",
        success: false,
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({
      massage: "Authorization failed!\n Error:" + error.message,
      success: false,
      data: null,
    });
  }
};
