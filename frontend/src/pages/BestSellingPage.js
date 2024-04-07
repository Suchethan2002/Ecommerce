import React from "react";
import Header from "../components/Layout/Header.js";
import BestSelling from "../components/Collections/BestSelling/BestSelling.js";
import Footer from "../components/Layout/Footer.js";

const BestSellingPage = () => {
    return (
      <>
        <div>
          <Header />
        </div>
        <div>
          <BestSelling/>
        </div>
        <div><Footer/></div>
      </>
    );
  };
  
  export default BestSellingPage;