import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart} from "react-icons/ai";

const ProductCard = ({ product }) => {
  const d = product.name;
  const product_name = d.replace(/\s+/g, "-");
  const [isBookmarked, setIsBookmarked] = useState(false);
  
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

  

  return (
    <div className='flex w-full bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
      <Link to={`/product/${product_name}`} className="flex-1">
        <img src={product.image_Url[0].url} alt="" className='w-[200px] h-[200px] object-contain mb-3' />
        <h4 className='pb-3 font-[500]'>
          {product.name.length > 40 ? product.name.slice(0, 40) + "..." : product.name}
        </h4>
      </Link>
      <div className='flex flex-col items-end'>
        <button onClick={toggleBookmark} className='p-1'>
          {isBookmarked ? (
            <AiOutlineHeart className='h-6 w-6 text-blue-500' />
          ) : (
            <AiOutlineHeart className='h-6 w-6 text-gray-500' />
          )}
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;
