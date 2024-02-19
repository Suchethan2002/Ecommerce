import React, { useEffect, useState } from 'react';

const WishlistPage = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
  
    useEffect(() => {
      // Retrieve wishlist products from local storage
      const storedWishlistProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
      setWishlistProducts(storedWishlistProducts);
    }, []);
  
    const removeFromWishlist = (productId) => {
      // Remove the product from local storage for wishlist
      const updatedWishlistProducts = wishlistProducts.filter((product) => product.id !== productId);
      localStorage.setItem('bookmarkedProducts', JSON.stringify(updatedWishlistProducts));
      setWishlistProducts(updatedWishlistProducts);
    };
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img src={product.image_Url[0].url} alt={product.name} className="w-32 h-32 object-contain mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <button onClick={() => removeFromWishlist(product.id)} style={{color:'red'}}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WishlistPage;
  