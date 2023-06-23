const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  let alreadyExists = await User.findOne({ username });
  if (alreadyExists) {
    return res.status(400).json({
      message: "username already exists",
    });
  }

  let user = await User.create(req.body);

  res.status(200).json({
    message: "User created successfully",
    user: user,
    success: true,
  });
});

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  let user = await User.findOne({ username: req.body.username }).select(
    "+password"
  );
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  if (req.body.password !== user.password) {
    return res.status(401).json({ message: "incorrect password" });
  }
  let token = await user.generateAuthToken();
  res.cookie("jwt", token);
  res.status(200).json({
    message: "Auth successful",
    status: "success",
    user,
    token: token,
    success: true,
  });
};

// verify token
exports.verifyToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token is not valid",
      error: error,
    });
  }
};

// verify admin token for admin routes
exports.verifyAdminToken = async (req, res, next) => {
  try {
    const authToken = req.cookies.jwt;
    if (!authToken) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const token = authToken;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    if (!user.isAdmin) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token is not valid",
      error: error,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.checkLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!jwt) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
          error: "User not found",
        });
      }

      res.status(200).json({
        message: "User logged in",
        user,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
