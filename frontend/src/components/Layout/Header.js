import React, { useState, useEffect } from 'react';
import styles from '../../styles/styles';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut } from '../../Redux/Reducers/user'; // Importing the correct actions
import { Link } from 'react-router-dom';
// import Wishlist from '../Product/Wishlist'

import Navbar from './Navbar.js';

const Header = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.loggedIn); // Corrected the selector path
  console.log(isLoggedIn);
  const token = window.localStorage.getItem('token');
  const [dropDown, setDropDown] = useState('');
  const [arrow, setArrow] = useState(false);
  const [active, setActive] = useState(false);
  const cart=useSelector((state)=>state.cart.cart);

  const wishlist=useSelector((state)=>state.wishlist.wishlist);


  useEffect(() => {
    if (token) {
      dispatch(setLoggedIn(true)); // Dispatching the setLoggedIn action
    } else {
      dispatch(setLoggedOut()); // Dispatching the setLoggedOut action
    }
  }, [token, dispatch]);

  const handlelogout = () => {
    dispatch(setLoggedOut()); // Dispatching the setLoggedOut action
    // window.localStorage.removeItem('token');
    localStorage.clear();
  };

  return (
    <>
      <div className={`${styles.section}`}>
        {active ? null : (
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
              <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer" />
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
              <Link to='/wishlist'>
              <AiOutlineHeart size={35} color="white" />
             
              
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {wishlist.length}
              </span>
              </Link>
            </div>
            <div className="relative right-0 mx-5 cursor-pointer">
              <Link to='/Cart'>
              <AiOutlineShoppingCart size={35} color="white" />
              {/* Cart counter */}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {cart.length}
              </span>
              </Link>
            </div>
            {isLoggedIn ? (
              <div className="relative right-0 cursor-pointer" onClick={handlelogout}>
                <IoIosLogOut size={35} color="white" />
                {/* Cart counter */}
                
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
