import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { ProductContext } from "../context/ProductContext";
import { UserAuthContext } from "../context/UserAuth";

function Products({ cartOpen, setCartOpen }) {
  const [products, setProducts] = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const { cartDetails, getCart, addToCart } = useContext(CartDetailsContext);
  const { authData } = useContext(UserAuthContext);
  const user = authData;

  const getProducts = async () => {
    setLoading(true);
    try {
      let res = await Axios.get("/products");
      setProducts(res.data.products);
      console.log(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const goToCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    getProducts();
    user && getCart();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Top New Arrival
        </h2>
        {loading ? (
          <>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-4">
              {/* item */}
              {products.map((item, index) => (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg object-fit w-full h-60"
                      src={item.img}
                      alt
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-green-500 uppercase ">
                        {item.title}
                      </h5>
                    </a>
                    <p className="mb-3 text-center font-normal uppercase text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
                    <p className="mb-3 text-center font-bold text-gray-700 dark:text-gray-400">
                    ₹ {item.price}
                    </p>
                    <div className="flex px-4 py-2 justify-center">
                      {item.stock <= 0 ? (
                        <p className="text-red-500">Out of Stock</p>
                      ) : (
                        <>
                          {cartDetails.find(
                            (cartItem) => cartItem._id === item._id
                          ) ? (
                            <button
                              onClick={() => goToCart()}
                              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4"
                            >
                              Go to cart
                            </button>
                          ) : (
                            <>
                              {user && (
                                <button
                                  onClick={() =>
                                    addToCart(item._id, item.title)
                                  }
                                  className="bg-teal-800 text-white font-bold py-2 px-4  hover:bg-gray-600"
                                >
                                  Add To Cart
                                </button>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Products;
