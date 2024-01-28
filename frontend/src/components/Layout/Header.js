import React, { useState } from "react";
import styles from "../../styles/styles";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";

const Header = () => {
  const [dropDown ,setDropDown]=useState("");
  const [arrow,setArrow]=useState("false");
  const [active,setActive]=useState(false);
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <h4 className="text-center font text-3xl font-extrabold text-black">
            <span className="text-yellow-500">Shop</span>
            <span className="text-blue-500">4</span>
            go
          </h4>

          <div className="w-[50%] relative ">
            <input
              type="text"
              placeholder="Search Product"
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
          </div>
          <div className="w-[150px] bg-blue-500  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <h1 className="text-white">
              <Link to="/login" className="text-white-600 pl-2">
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <div
      className="transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]"
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div >
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
              {/* <BiMenuAltLeft size={30} className="absolute top-3 left-2" /> */}
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
                
              </button>
              {arrow?(<IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setArrow(!arrow)}
                
              />):(<IoIosArrowUp
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setArrow(!arrow)}
              />)

              } 
              
            </div>
          </div>
        
         
          <div className={`${styles.noramlFlex}`}>
            <Navbar/>
          </div>
          <div className="flex">
            <div className="relative right-0 ">
              <AiOutlineHeart size={30} color="white" />
            </div>
            <div className="relative right-0 ">
              <AiOutlineShoppingCart size={30} color="white" />
            </div>
          </div>
        </div>
        </div>
     
    </>
  );
};
export default Header;
