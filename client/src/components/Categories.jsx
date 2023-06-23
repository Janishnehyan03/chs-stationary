import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { useEffect } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    let { data } = await Axios.get("/categories");
    setCategories(data.categories);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {/* category text*/}
      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by category
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-3">
          {/* item */}
          {categories.map((item) => (
            <Link
              to={`/category/${item._id}`}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
            >
              <h5 className="mb-2 text-2xl font-semibold text-center tracking-tight text-gray-900 ">
                {item.name}
              </h5>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
