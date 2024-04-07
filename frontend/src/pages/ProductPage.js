import React from "react";
import Header from "../components/Layout/Header";
import Product from "../components/Collections/Product/Product";
import Footer from "../components/Layout/Footer";

const ProductPage = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Product />
      </div>
      <div><Footer/></div>
    </>
  );
};

export default ProductPage;
