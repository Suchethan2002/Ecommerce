import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const d=product.name;
  const product_name=d.replace(/\s+/g,"-");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Retrieve wishlist products from local storage
    const storedWishlistProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
    setWishlistProducts(storedWishlistProducts);

    // Retrieve cart products from local storage
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedCartProducts);
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    
    // Retrieve existing wishlist items from local storage
    const existingBookmarkedProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
    
    // Check if the product is already in the wishlist
    const isAlreadyBookmarked = existingBookmarkedProducts.some(p => p.id === product.id);
  
    if (!isAlreadyBookmarked) {
      // Add the product to the wishlist
      const updatedBookmarkedProducts = [...existingBookmarkedProducts, product];
      localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedBookmarkedProducts));
    } else {
      // Remove the product from the wishlist
      const updatedBookmarkedProducts = existingBookmarkedProducts.filter(p => p.id !== product.id);
      localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedBookmarkedProducts));
    }
  };
  
  const toggleCart = () => {
    setIsAddedToCart((prev) => !prev);
  
    // Retrieve existing cart items from local storage
    const existingCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  
    // Check if the product is already in the cart
    const isAlreadyInCart = existingCartProducts.some(p => p.id === product.id);
  
    if (!isAlreadyInCart) {
      // Add the product to the cart
      const updatedCartProducts = [...existingCartProducts, product];
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
    } else {
      // Remove the product from the cart
      const updatedCartProducts = existingCartProducts.filter(p => p.id !== product.id);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
    }
  };
  

  return (
    
    <div className='w-full h-[280px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
    <div className='flex justify-between items-center mb-2'>
      <button onClick={toggleBookmark}>
        {isBookmarked ? (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 15l7-7 7 7' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 10h16M4 14h16M4 18h16' />
          </svg>
        )}
      </button>
      <button onClick={toggleCart}>
        {isAddedToCart ? (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19l3-7 11-2-5-5-1-11-5 10-11 1 11 5 5 5zm0 0v0' />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19l3-7 11-2-5-5-1-11-5 10-11 1 11 5 5 5zm0 0v0' />
          </svg>
        )}
      </button>
    </div>
    <Link to={`/product/${product_name}`}>
      {(
        <img  src={product.image_Url[0].url} alt=""
        className='w-full h-[170px] object-contain'/>)}
        <h4 className='pb-3 font-[500]'>
          {product.name.length>40?product.name.slice(0,40)+"...":product.name}
        </h4>
      </Link>
  </div>
);
};

export default ProductCard;
