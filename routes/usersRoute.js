const router = require("express").Router();
const User = require("../modules/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//Register new user
router.post("/register", async (req, res) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.send({
        message:
          "Another user registered with this email. Please provide another email!",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "Registration finished successfully!",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//Login users
router.post("/login", async (req, res) => {
  try {
    //first  find user based on user send back-end
    const existUser = await User.findOne({ email: req.body.email });

    //If user does not exist send error message
    if (!existUser) {
      return res.send({
        message: "User does not exist!",
        success: false,
        data: null,
      });
    }

    //if user exist compare exist user password and user sended data by bcrypt
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    //if password not matched send message
    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password!",
        success: false,
        data: null,
      });
    }

    //if password match send font-end token .Only encrypt userId expires 1 day
    const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully!",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//get-user-by-id
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    res.send({
      message: "User fetched successfully!",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
