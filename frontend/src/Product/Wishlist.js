// Wishlist.js

import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector(state => state.productData.productData);

  console.log(wishlist)

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlistProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} /> {/* Render ProductCard with product details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;