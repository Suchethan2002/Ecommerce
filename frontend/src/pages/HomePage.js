import React from "react";
import Header from "../components/Layout/Header.js";
import BackGround from "../components/Collections/BackGround/BackGround.js";
import BestDeals from "../components/Collections/BackGround/BestDeals.js";
import Footer from "../components/Layout/Footer.js";
const HomePage = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <BackGround />
        <BestDeals/>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;
