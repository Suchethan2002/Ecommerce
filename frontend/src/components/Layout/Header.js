import React, { useState, useEffect } from 'react';
import styles from '../../styles/styles';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosLogOut } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut } from '../../Redux/Reducers/user';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../Redux/Actions/CartAction.js';
import Navbar from './Navbar.js';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { removeFromWishlist } from '../../Redux/Actions/wishlistAction.js';
import { addToCart } from '../../Redux/Actions/CartAction.js';
import { BiMenuAltLeft } from "react-icons/bi";


const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const token = window.localStorage.getItem('token');
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector((state) => state.productData.productData);
  const collection=useSelector((state)=>state.events.events)
  const [showCategories, setShowCategories] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  
  const cartProducts = products ? products.filter(product => cart.includes(product.id)) : [];
  const wishlistProducts = products ? products.filter(product => wishlist.includes(product.id)) : [];

  console.log(collection,"collection");

  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
    setShowWishlistDropdown(false); // Close wishlist dropdown when opening cart dropdown
  };

  const toggleWishlistDropdown = () => {
    setShowWishlistDropdown(!showWishlistDropdown);
    setShowCartDropdown(false); // Close cart dropdown when opening wishlist dropdown
  };

  useEffect(() => {
    if (token) {
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedOut());
    }
  }, [token, dispatch]);

  const handlelogout = () => {
    dispatch(setLoggedOut());
    localStorage.clear();
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      products &&
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

 


  const categories = [
    { id: 1, name: 'Accessories' },
    { id: 2, name: 'Home & Garden' },
    { id: 3, name: 'Beauty & Health' },
    { id: 4, name: 'Electronics' },
    { id: 5, name: 'Fashion' },
  ];

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
                value={searchTerm}
              onChange={handleSearchChange}
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
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div>
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                onClick={() => setShowCategories(!showCategories)}
              >
                All Categories {showCategories ? <IoIosArrowUp size={20} style={{ marginRight: '10px' }} /> : <IoIosArrowDown size={20} style={{ marginRight: '10px' }} />}
              </button>
              {showCategories && (
                <div className="absolute bg-white w-full top-[50px] z-10 shadow-lg">
                  {/* Replace the below array with your categories data */}
                  {categories.map((category) => (
                    <Link key={category.name} to={`/category/${category.name}`} className="block px-4 py-2 hover:bg-gray-200">
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
            <div className="relative">
              <div className="relative right-0 mx-5 cursor-pointer" onClick={toggleWishlistDropdown}>
                <AiOutlineHeart size={35} color="white" />
                {/* Wishlist counter */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {wishlist.length}
                </span>
              </div>
              {/* Wishlist dropdown content */}
              {showWishlistDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
                    {wishlist.length > 0 ? (
                      // Render wishlist items if wishlist is not empty
                      wishlistProducts.map((item, index) => (
                        <div key={item.id} className={`mb-2 flex items-center ${index !== wishlist.length - 1 ? 'border-b border-gray-400 pb-2' : ''}`}>
                          {/* Render Product Image */}
                          <button onClick={() => dispatch(removeFromWishlist(item.id))} className="text-red-600 font-semibold focus:outline-none">X</button>
                          <img src={item.image_Url} alt={item.name} className="w-16 h-16 mr-4" /> {/* Customize image size */}

                          {/* Product Details */}
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-500">Price: ${item.price}</p>

                            {/* Add any other product details you want to display */}
                          </div>

                          <button onClick={() => dispatch(addToCart(item.id))} className="text-black font-semibold focus:outline-none"><AiOutlineShoppingCart size={30} color="black" /></button>

                          {/* Quantity */}
                          <div className="ml-auto flex items-center">
                            {/* Quantity controls */}
                          </div>
                        </div>
                      ))
                    ) : (
                      // Render message if wishlist is empty
                      <p className="text-gray-600">Your wishlist is empty.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative right-0 mx-5 cursor-pointer" onClick={toggleCartDropdown}>
                <AiOutlineShoppingCart size={35} color="white" />
                {/* Cart counter */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {cart.length}
                </span>
              </div>
              {/* Cart dropdown content */}
              {showCartDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Cart</h2>
                    {cart.length > 0 ? (
                      // Render cart items if cart is not empty
                      cartProducts.map((product, index) => (
                        <div key={product.id} className={`mb-2 flex items-center ${index !== cartProducts.length - 1 ? 'border-b border-gray-400 pb-2' : ''}`}>
                          
                            
                          {/* Render Product Image */}
                          <img src={product.image_Url} alt={product.name} className="w-16 h-16 mr-4" /> {/* Customize image size */}
                          {/* Product Details */}
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-500">Price: ₹{product.price}</p>
                            {/* Add any other product details you want to display */}
                          </div>
                          {/* Quantity */}
                          <div className="ml-auto flex items-center">
                            {/* Quantity controls */}
                            <button onClick={() => dispatch(removeFromCart(product.id))} className="text-red-600 font-semibold focus:outline-none">X</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Render message if cart is empty
                      <p className="text-gray-600">Your cart is empty.</p>
                    )}
                    {/* Checkout button */}
                    {cart.length > 0 && (
                      <Link to='/ordersummary' >
                        <button className="bg-black text-white px-4 py-2 rounded-md mt-4">Checkout</button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="relative right-0 cursor-pointer" onClick={handlelogout}>
                <IoIosLogOut size={35} color="white" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
