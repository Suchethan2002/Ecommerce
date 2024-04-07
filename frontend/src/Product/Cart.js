import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector(state => state.productData.productData);

  const cartProducts = products.filter(product => cart.includes(product.id));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Cart</h2>
      <div className="grid grid-cols-3 gap-4"> {/* Grid container with 3 columns and gap between items */}
        {cartProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} /> {/* Render ProductCard with product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
