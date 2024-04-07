import React from "react";
import Header from "../Layout/Header";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderPlaced = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-semibold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-8">Your order has been successfully placed. Thank you for shopping with us!</p>
        <Link to='/'>
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">Back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default OrderPlaced;
