// Wishlist.js

import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector(state => state.productData.productData);

  console.log(cart)

  const cartProducts = products.filter(product => cart.includes(product.id));

  return (
    <div>
      <h2>cart</h2>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} /> {/* Render ProductCard with product details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;