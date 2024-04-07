import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector(state => state.productData.productData);

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-3 gap-4"> {/* Grid container with 3 columns and gap between items */}
        {wishlistProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} /> {/* Render ProductCard with product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
