import { faList, faShoppingBag, faShoppingCart, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="container">
      <h1 className="text-3xl font-medium text-gray-800 uppercase mb-6">
        Dashboard
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
        {/* item */}

        <Link
          to={`/admin-orders`}
          className=" p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  "
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="mb-2 uppercase  text-4xl text-center tracking-tight text-gray-900 "
          />
          <h5 className="mb-2 uppercase text-2xl font-semibold text-center tracking-tight text-gray-900 ">
            orders
          </h5>
        </Link>
        <Link
          to={`/admin-categories`}
          className=" p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  "
        >
          <FontAwesomeIcon
            icon={faList}
            className="mb-2 uppercase  text-4xl text-center tracking-tight text-gray-900 "
          />{" "}
          <h5 className="mb-2 uppercase text-2xl font-semibold text-center tracking-tight text-gray-900 ">
            categories
          </h5>
        </Link>
        <Link
          to={`/admin-products`}
          className=" p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  "
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
            className="mb-2 uppercase  text-4xl text-center tracking-tight text-gray-900 "
          />{" "}
          <h5 className="mb-2 uppercase text-2xl font-semibold text-center tracking-tight text-gray-900 ">
            Products
          </h5>
        </Link>
        <Link
          to={`/admin-users`}
          className=" p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  "
        >
          {" "}
          <FontAwesomeIcon
            icon={faUserCheck}
            className="mb-2 uppercase  text-4xl text-center tracking-tight text-gray-900 "
          />
          <h5 className="mb-2 uppercase text-2xl font-semibold text-center tracking-tight text-gray-900 ">
            users
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
