import React from "react";
import Header from "../components/Layout/Header.js";
import BestSelling from "../components/Collections/BestSelling/BestSelling.js";

const BestSellingPage = () => {
    return (
      <>
        <div>
          <Header />
        </div>
        <div>
          <BestSelling/>
        </div>
      </>
    );
  };
  
  export default BestSellingPage;