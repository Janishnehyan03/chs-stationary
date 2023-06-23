import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function OrderBtn({ payMethod, cartDetails, totalPrice, user }) {
  const [loading, setLoading] = useState(false);
  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/orders/", {
        amount: totalPrice,
        products: cartDetails,
        userId: user._id,
        payMethod: payMethod,
      });

      if (res.status == 200) {
        setLoading(false);
        toast.success("Order Placed Succesfully", {
          position: "top-center",
          autoClose: 2000,
        });
        window.location.href = "/success-order";
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error("Error Placing Order", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <button className="w-full px-6 py-2 text-white  bg-green-500  hover:bg-green-600">
          Loading...
        </button>
      ) : (
        <button
          onClick={(e) => placeOrder(e)}
          className="w-full px-6 py-2 text-white  bg-green-500  hover:bg-green-600"
        >
          Place Order Now
        </button>
      )}
    </div>
  );
}

export default OrderBtn;
