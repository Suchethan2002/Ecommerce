import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import Ratings from "./Ratings";
import styles from "../styles/styles";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../Redux/Actions/wishlistAction";
import {
  selectTotalIndividualViews,
  selectTotalViews,
} from "../Redux/Reducers/viewSlice";
import Cart from "./Cart";
import { addEvent } from '../Redux/Actions/EventActions';

import { addToCart, removeFromCart, fetchCart } from "../Redux/Actions/CartAction";

const ProductCard = ({ product }) => {
  const d = product.name;
  const product_name = d.replace(/\s+/g, "-");
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state) => state.cart.cart);
  const views = useSelector((state) => state.views.views[product.id] || 0);
  const totalIndividualViews = useSelector(selectTotalIndividualViews);
  const totalViews = useSelector(selectTotalViews);
  const [productData, setProductData] = useState(null);


  const logEvent = (type, productId) => {
    const timestamp = new Date().toISOString(); // Get current timestamp
    dispatch(addEvent({ type, product_id: productId, timestamp }));
  };
  const handleView = () => {
    dispatch({ type: "ADD_VIEW", productId: product.id });

    logEvent('product_view', product.id); // Log product view event
    // Log data to console
    // Log page view event with URL

  };
   const data = [
    {
      product_id: product.id,
      totalViews,
      individualViews: totalIndividualViews,
    },
  ];

  const viewData = JSON.stringify(data);
  sessionStorage.setItem("ViewData", viewData);



  const handleWishlist = () => {
    if (wishlist.includes(product.id)) {
      logEvent('remove_from_wishlist', product.id); // Log product view event

      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
      logEvent('add_to_wishlist', product.id); // Log product view event

    }
  };

  const handleCart = () => {

    if (cart.includes(product.id)) {
      logEvent('remove_from_cart', product.id); // Log product view event


      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product.id));
      logEvent('add_to_cart', product.id); // Log product view event

      
    }
  };

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/${product.category}/${product_name}`} onClick={handleView}>
          <img
            src={product.image_Url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
          <h4 className="pb-3 font-[500]">
            {product.name.length > 40
              ? product.name.slice(0, 40) + "..."
              : product.name}
          </h4>
          <div className="flex">
            <Ratings rating={product.rating} />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                ₹{product.price === 0 ? product.price : product.discount_price}
              </h5>
              <h4 className={`${styles.price}`}>
                {product.price ? " ₹" + product.price : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {product.total_sell} sold
            </span>
          </div>
          <div>
            <Link to="/ordersummary">
              <button style={{ backgroundColor: "black", color: "white", height: "30px", width: "120px", borderRadius: "10px", marginBottom: '20px' }}>
                Buy Now
              </button>
            </Link>
          </div>
        </Link>
        {wishlist.includes(product.id) ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="red"
            title="Remove from wishlist"
            onClick={handleWishlist}
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            color="#333"
            title="Add to wishlist"
            onClick={handleWishlist}
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          color="#333"
          title={`View ${views} times`}
        />
        {cart.includes(product.id) ? (
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="blue"
            title="Add to cart"
            onClick={handleCart}
          />
        ) : (
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
            onClick={handleCart}
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;
