const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .populate("userId", )
      .populate("products.productId");

    res.status(200).json({
      message: "Orders fetched successfully",
      results: orders.length,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    //  create order from cart

    let order = await Order.create({
      ...req.body,
      userId: req.user._id,
    });
    //  update cart
    await Cart.deleteOne({ userId: req.user._id });
    // substract product stock after order is placed successfully
    const products = await Product.find({
      _id: { $in: order.products },
    });
    products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product._id, {
        stock:
          product.stock -
          order.products.find(
            (p) => p.productId.toString() === product._id.toString()
          ).quantity,
      });
    });
    res.status(200).json({
      message: "Order created successfully",
      order,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Order creation failed",
      error,
    });
  }
};

// get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $match: { userId: req.user._id } },
      { $match: { status: { $ne: "pending" } } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "product",
        },
      },
    ]).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Orders fetched successfully",
      results: orders.length,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
