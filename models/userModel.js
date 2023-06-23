const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    admissionNumber: {
      type: String,
      required: true,
    },

    password: {
      //  this is not editable
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// generate token function
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
