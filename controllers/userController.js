const Address = require("../models/addressModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

// exports.getAllUsers = async (req, res) => {
//   try {
//     // find all users without admin and password
//     const users = await User.find();
//     res.status(200).json({
//       message: "Users fetched successfully",
//       results: users.length,
//       users,
//     });
//   } catch (error) {
//     res.status(400).json({
//       error,
//     });
//   }
// };
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("products.productId");

    const usersWithOrderDetails = users.map((user) => {
      const userOrders = orders.filter(
        (order) => order.userId._id.toString() === user._id.toString()
      );

      const totalPendingAmount = userOrders.reduce(
        (total, order) => total + order.amount,
        0
      );
      const totalPaidAmount = userOrders.reduce(
        (total, order) => total + order.paidAmount,
        0
      );

      return {
        _id: user._id,
        username: user.username,
        admissionNumber: user.admissionNumber,
        studentClass: user.studentClass,
        totalPendingAmount, // Total pending amount for the user
        totalPaidAmount, // Total paid amount for the user
      };
    });

    res.status(200).json({
      users: usersWithOrderDetails,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};


//  get one user
exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// update user without admin and password fields (password is encrypted) and isAdmin field (isAdmin is not editable)
exports.updateUser = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  if (isAdmin) {
    return res.status(400).json({
      message: "isAdmin field is not editable",
    });
  } else if (password) {
    return res.status(400).json({
      message: "Password field is not editable",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// get user stats
exports.getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    // get data of the month
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "User stats fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

// create address
exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      email: req.user.email,
      user: req.user._id,
    });
    res.status(200).json({
      message: "Address created successfully",
      address,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

// get my addresses
exports.getMyAddresses = async (req, res) => {
  try {
    const address = await Address.find({ user: req.user._id }).populate(
      "user",
      {
        username: 1,
        email: 1,
      }
    );
    res.status(200).json({
      message: "Address fetched successfully",
      address,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    // make all addresses not default and then set the selected address to default
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isDefault: true,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      message: "Address updated successfully",
      address,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
