// create a product model and export it as a mongoose model
// Language: javascript
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    stock: {
      type: Number,
      required: true,
    },
  
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// get all products that are not deleted
// productSchema.pre(/^find/, function (next) {
//   this.find({ deleted: { $ne: true } });
//   next();
// });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
