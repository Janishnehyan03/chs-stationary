import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Axios from "../Axios";
import { CartDetailsContext } from "../context/CartDetails";
import { ToastContainer } from "react-toastify";

// function Shop({ cartOpen, setCartOpen }) {

//   return (
//     <>
//       <div>
//         {show && (
//           <div className="w-full h-full" id="chec-div">
//             <ToastContainer />
//             <div className="w-full h-full" id="checkout">
//               <div className="flex md:flex-row flex-col justify-end" id="cart">
//                 <div
//                   className="w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
//                   id="scroll"
//                 >
//                   <Link
//                     to="/"
//                     className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
//                     onClick={() => setShow(!show)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="icon icon-tabler icon-tabler-chevron-left"
//                       width={16}
//                       height={16}
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                       <polyline points="15 6 9 12 15 18" />
//                     </svg>
//                     <p className="text-sm pl-2 leading-none">Back</p>
//                   </Link>
//                   <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
//                     {category}
//                   </p>

//                   {products.length > 0 ? (
//                     products.map((product) => (
//                       <div className="md:flex items-center py-8 border-t border-b border-gray-200">
//                         <div className="h-full w-1/4">
//                           <img
//                             src={product.img}
//                             alt={product.title}
//                             className="object-center object-cover h-64"
//                           />
//                         </div>
//                         <div className="md:pl-3 md:w-3/4 w-full">
//                           <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
//                             {product._id}
//                           </p>
//                           <div className="flex items-center justify-between w-full pt-1">
//                             <p className="text-base font-black leading-none text-gray-800">
//                               {product.title}
//                             </p>
//                           </div>
//                           <p className="text-xs leading-3 text-gray-600 pt-2">
//                             {product.description}
//                           </p>

//                           <div className="flex items-center justify-between pt-5 pr-6">
//                             <div className="flex itemms-center">
//                               {/* add to cart button */}
//                               {cartDetails.find(
//                                 (cart) => cart.productId === product._id
//                               ) ? (
//                                 <button
//                                   onClick={() => goToCart()}
//                                   className="bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
//                                 >
//                                   Go To Cart
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={() =>
//                                     addToCart(product._id, product.title)
//                                   }
//                                   className="bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
//                                 >
//                                   Add to Cart
//                                 </button>
//                               )}
//                             </div>
//                             <p className="text-base font-black leading-none text-gray-800">
//                               $ {product.price}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="flex items-center justify-between w-full pt-1">
//                       <p className="text-base font-black leading-none text-gray-800">
//                         No products in this category
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>
//         {` /* width */
//                 #scroll::-webkit-scrollbar {
//                     width: 1px;
//                 }

//                 /* Track */
//                 #scroll::-webkit-scrollbar-track {
//                     background: #f1f1f1;
//                 }

//                 /* Handle */
//                 #scroll::-webkit-scrollbar-thumb {
//                     background: rgb(133, 132, 132);
//                 }
// `}
//       </style>
//     </>
//   );
// }

// export default Shop;
import React, { useState } from "react";
import { UserAuthContext } from "../context/UserAuth";

function Index({ cartOpen, setCartOpen }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const { authData } = useContext(UserAuthContext);
  const user = authData;

  const { addToCart, cartDetails, getCart } = useContext(CartDetailsContext);
  const getCategory = async () => {
    const response = await Axios.get(`/categories/${id}`);
    setCategory(response.data.category.name);
  };
  const getProducts = async () => {
    const response = await Axios.get(`/products?category=${id}`);
    setProducts(response.data.products);
  };

  const goToCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    getCategory();
    user && getCart();
  }, []);
  return (
    <>
      <ToastContainer />
      <div>
        <div className="w-full ">
          <div
            className="w-full h-full  transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col" id="cart">
              <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8">
                <Link
                  to={`/`}
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </Link>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                  {category}
                </p>

                {products.length > 0 ? (
                  <>
                    {products.map((item, index) => (
                      <div className="md:flex items-center py-8 border-t border-b border-gray-200">
                        <div className="h-full w-1/2">
                          <img
                            src={item.img}
                            alt
                            className="w-full h-60 object-center object-cover"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4 w-full">
                          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                            #{item._id}
                          </p>
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="uppercase font-black leading-none text-2xl text-green-500">
                              {item.title}
                            </p>
                          </div>
                          <p className="text-xs leading-3 uppercase my-2 text-gray-600 pt-2">
                            {item.description}
                          </p>
                          <p className="text-base font-black leading-none text-gray-800">
                              ₹ {item.price}
                            </p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="flex px-4 py-2 justify-center">
                              {item.stock <= 0 ? (
                                <p className="text-red-500">Out of Stock</p>
                              ) : (
                                <>
                                  {user &&
                                  cartDetails.find(
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
                                      {
                                        <button
                                          onClick={() =>
                                            addToCart(item._id, item.title)
                                          }
                                          className="bg-teal-800 text-white font-bold py-2 px-4  hover:bg-gray-600"
                                        >
                                          Add To Cart
                                        </button>
                                      }
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full pt-1 mt-4">
                    <p className="text-base font-black uppercase leading-none text-gray-800">
                      No products in this category
                    </p>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
