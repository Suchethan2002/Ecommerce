import React, { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setLoggedInStatus } from "../../redux/Actions/user";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";

const Header = (props) => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");

  const [showCategories, setShowCategories] = useState(false);

  if (token) {
    dispatch(setLoggedInStatus(true));
  } else {
    dispatch(setLoggedInStatus(false));
  }

  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Beauty Products' },
    { id: 4, name: 'Footwear' },
    { id: 5, name: 'Kitchenware' },
    { id: 6, name: 'Domestic Appliances' },
  ];
  
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <h4 className="text-center font text-3xl font-extrabold text-black">
            <span className="text-blue-500">Shop</span>
            <span className="text-red-500">Ease</span>
          </h4>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product"
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer" />
          </div>
          {!token && (
            <div className="w-[150px] bg-blue-500  h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
              <h1 className="text-white">
                <Link to="/login" className="text-white-600 pl-2">
                  Login
                </Link>
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]">
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          <div>
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                onClick={() => setShowCategories(!showCategories)}
              >
                All Categories {showCategories ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
              </button>
              {showCategories && (
                <div className="absolute bg-white w-full top-[50px] z-10 shadow-lg">
                  {/* Replace the below array with your categories data */}
                  {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.id}`} className="block px-4 py-2 hover:bg-gray-200">
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <Navbar />
          </div>
          <div className="flex">
            <div className="relative right-0 mx-5 cursor-pointer">
              <Link to="/wishlist">
                <AiOutlineHeart size={35} color="white" />
              </Link>
            </div>
            <div className="relative right-0 cursor-pointer">
              <Link to="/cart">
                <AiOutlineShoppingCart size={35} color="white" />
              </Link>
            </div>
            <div className="relative right-0 cursor-pointer">
              <Link to="/profile">
                <AiOutlineUser style={{ marginLeft: "20px" }} size={35} color="white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
