import React, { useState,useEffect} from "react";
import styles from "../../styles/styles";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInStatus } from "../../Redux/Actions/user";

import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";

const Header = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const token = window.localStorage.getItem("token");
  const [dropDown, setDropDown] = useState("");
  const [arrow, setArrow] = useState("false");
  const [active, setActive] = useState(false);
  // useEffect(() => {
  //   if (props.type === 2) {
  //     setActive(true);
  //   }
  // }, [props.type]);

  if (token) {
    dispatch(setLoggedInStatus(true));
  } else {
    dispatch(setLoggedInStatus(false));
  }
  return (
    <>
      <div className={`${styles.section}`}>
        {active?null:(
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
          {isLoggedIn ? null : (
            <div className="w-[150px] bg-blue-500  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
              <h1 className="text-white">
                <Link to="/login" className="text-white-600 pl-2">
                  Login
                </Link>
              </h1>
            </div>
          )}
        </div>
        )}
      </div>
      <div className="transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]">
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div>
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
              {/* <BiMenuAltLeft size={30} className="absolute top-3 left-2" /> */}
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              {arrow ? (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setArrow(!arrow)}
                />
              ) : (
                <IoIosArrowUp
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setArrow(!arrow)}
                />
              )}
            </div>
          </div>

          <div className={`${styles.noramlFlex}`}>
            <Navbar />
          </div>
          <div className="flex">
            <div className="relative right-0 mx-5 cursor-pointer">
              <AiOutlineHeart size={35} color="white" />
              {/* Wishlist counter */}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {/* {wishlistItemCount} */} 10
              </span>
            </div>
            <div className="relative right-0 cursor-pointer">
              <AiOutlineShoppingCart size={35} color="white" />
              {/* Cart counter */}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {/* {cartItemCount} */} 1
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
