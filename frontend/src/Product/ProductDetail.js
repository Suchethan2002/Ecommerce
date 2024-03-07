import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from './ProductList'
const ProductDetail = ({ products }) => {
  const { productName } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products && productName) {
      const foundProduct = products.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === productName.toLowerCase());
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productName, products]);

  if (!product) {
    return <div>Product not found</div>;
  }

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
    <div>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px' }}>
      <div style={{ width: '30%', height: '30%', marginRight: '20px' }}>
        <img src={product.image_Url[0].url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '50px', marginRight: '50px' }} />
      </div>
      <div style={{ flex: '1', marginLeft: '100px' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '32px' }}>{product.name}</h2>
        {/* Product Price */}
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Price: ${product.price}</p>
        {/* Product Ratings */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '16px', marginRight: '10px' }}>Ratings:</span>
          <span style={{ fontSize: '16px', color: 'gold' }}>⭐⭐⭐⭐⭐</span> {/* Assuming a 5-star rating */}
        </div>
        {/* Product Variations (if applicable) */}
        {product.variations && (
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '16px', marginRight: '10px' }}>Variations:</span>
            <select>
              {product.variations.map((variation, index) => (
                <option key={index} value={variation}>{variation}</option>
              ))}
            </select>
          </div>
        )}
        {/* Cart Button */}
        
        <button onClick={toggleCart} style={{ backgroundColor: 'black', color: 'white', height: "50px", width: "150px", borderRadius: "20px", marginBottom: '20px',marginRight:'100px' }} className='p-1'>
  {isAddedToCart ? (
    <span className="white">Added to Cart</span>
  ) : (
    <span className="white">Add to Cart</span>
  )}
</button>

        <button style={{ backgroundColor: 'black', color: 'white', height: "50px", width: "150px", borderRadius: "20px", marginBottom: '20px' }}>
          Buy Now
        </button>
        {/* Product Description */}
        <p>{product.description}</p>
      </div>
      
    </div>
    <div style={{marginTop:'80px'}}><ProductList/></div>

    </div>
  );
};

export default ProductDetail;
