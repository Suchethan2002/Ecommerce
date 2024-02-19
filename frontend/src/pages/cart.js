import React, { useEffect, useState } from 'react';

const CartPage = () => {
    const [cartProducts, setCartProducts] = useState([]);
  
    useEffect(() => {
      // Retrieve cart products from local storage
      const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      setCartProducts(storedCartProducts);
    }, []);
  
    const removeFromCart = (productId) => {
      // Remove the product from local storage for cart
      const updatedCartProducts = cartProducts.filter((product) => product.id !== productId);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
      setCartProducts(updatedCartProducts);
    };
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cartProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img src={product.image_Url[0].url} alt={product.name} className="w-32 h-32 object-contain mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <button onClick={() => removeFromCart(product.id)} style={{color:'red'}}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CartPage;
  