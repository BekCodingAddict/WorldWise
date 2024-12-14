const router = require("express").Router();
const User = require("../modules/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const axios = require("axios");

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

//Adding Cities Lists
router.post("/add-city", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
        data: null,
      });
    }

    user.cities.push(req.body);
    await user.save();

    res.status(200).send({
      message: "New City has added successfully!",
      success: true,
      data: user.cities,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//Reverse Geocode API route
router.post("/reverse-geocode", async (req, res) => {
  const BASE_URL = `https://us1.locationiq.com/v1/reverse`;
  const { lat, lng } = req.body;

  try {
    if (!lat || !lng) {
      return res.status(400).send({
        message: "Latitude and longitude are required!",
        success: false,
        data: null,
      });
    }
    const API_URL = `${BASE_URL}?lat=${lat}&lon=${lng}&format=json&key=${process.env.GEOCODING_API_KEY}`;
    // Send request to the geocode API
    const response = await axios.get(API_URL);
    if (!response) {
      return res.status(400).send({
        message: "That does not seem to be a city!",
        success: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "Reversing Geocode successfully finished!",
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// Get Cities
router.post("/get-cities", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//delete Cities
router.post("/delete-city", authMiddleware, async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.body.userId },
      { $pull: { cities: { _id: req.body.cityId } } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "City removed successfully!",
        success: true,
        data: null,
      });
    } else {
      res.status(404).send({
        message: "City not found or already removed!",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

//Geting one spesific city
router.post("/get-city-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const city = user.cities.find(
      (city) => city._id.toString() === req.body.cityId
    );
    if (!city) {
      return res.status(404).send({
        message: "City not found!",
        success: false,
        data: null,
      });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
