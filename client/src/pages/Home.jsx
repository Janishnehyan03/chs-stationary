import React from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";

function Home({ cartOpen, setCartOpen }) {
  return (
    <>
      <Categories />
      <Products cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

export default Home;
