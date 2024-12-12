const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cities: {
      type: [
        {
          cityName: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          emoji: {
            type: String,
          },
          date: {
            type: Date,
            required: true,
          },
          notes: {
            type: String,
          },
          position: {
            lat: {
              type: Number,
              required: true,
            },
            lng: {
              type: Number,
              required: true,
            },
          },
        },
      ],
      default: [], // Default ro an empty array for new users
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", usersSchema);
