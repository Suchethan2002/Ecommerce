// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
    console.log(products);
  const { productName } = useParams();
  console.log(productName);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Searching for product:", productName.toLowerCase());
    console.log("Products data:", products);
  
    if (products && productName) {
      const foundProduct = products.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === productName.toLowerCase());
      console.log("Found product:", foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productName, products]);
  
  
  console.log(product)

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img style={{ width: '30%', height: '30%' }} src={product.image_Url[0].url} alt={product.name} />
      <p>{product.description}</p>
      
    </div>
  );
};

export default ProductDetail;
