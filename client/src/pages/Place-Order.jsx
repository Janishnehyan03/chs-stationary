import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { UserAuthContext } from "../context/UserAuth";
import OrderBtn from "./OrderBtn";

function PlaceOrder() {
  const { cartDetails, getCartDetails } = useContext(CartDetailsContext);
  const { authData } = useContext(UserAuthContext);
  let user = authData;
  const [totalPrice, setTotalPrice] = useState(0);

  const [payMethod, setPayMethod] = useState(null);
  const [address, setAddress] = useState([]);
  const [formData, setFormData] = useState({
    products: [],
    amount: 0,
    address: "",
    phone: "",
    city: "",
    zip: 0,
    state: "",
    country: "",
  });

  const getTotal = async () => {
    let res = await Axios.get("/carts/total-price");
    setTotalPrice(res.data.totalPrice);
  };
  const removeFromCart = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from cart?`)) {
      try {
        await Axios.patch(`/carts/remove-from-cart/${id}`);
        getCartDetails();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCartDetails();
    getTotal();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="mt-20">
        <h1 className="flex items-center uppercase justify-center font-bold text-green-600 text-md lg:text-3xl">
          Checkout Page
        </h1>
      </div>
      <div className="grid grid-cols-2">
        <div className="container p-12 mx-auto">
          <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col w-full ml-0 lg:ml-12">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  {cartDetails.map((cartItem, index) => (
                    <div className="flex flex-col space-y-4">
                      <div className="flex space-x-4 mb-4">
                        <div>
                          <img
                            src={cartItem.product.img}
                            alt="image"
                            className="w-40"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {cartItem.product.title}
                          </h2>
                          <p className="text-sm">
                            {cartItem.product.description}
                          </p>
                          <p className="text-sm"></p>
                          <span className="text-red-600">Price </span>
                          {cartItem.quantity} x ₹{cartItem.product.price}
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() =>
                              removeFromCart(
                                cartItem.product._id,
                                cartItem.product.title
                              )
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex p-4 mt-4">
                  <h2 className="text-xl font-bold uppercase text-green-600">
                    {cartDetails.length}{" "}
                    {cartDetails.length > 1 ? "Items" : "Item"}
                  </h2>
                </div>

                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total
                  <span className="ml-2">$ {totalPrice}</span>
                </div>
                <div className="mt-4">
                  {cartDetails.length > 0 ? (
                    <>
                      <OrderBtn
                        payMethod={payMethod}
                        cartDetails={cartDetails}
                        getCartDetails={getCartDetails}
                        getTotal={getTotal}
                        totalPrice={totalPrice}
                        user={user}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-3xl text-gray-500">
                        Please add items to your cart
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
