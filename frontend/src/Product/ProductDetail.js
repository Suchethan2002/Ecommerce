// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDataCollector from './UserDataCollector';

const ProductDetail = ({ products }) => {
    // console.log(products[0].rating);
  const { productName } = useParams();
  // console.log(productName);

  const [product, setProduct] = useState(null);
  const [timeSpent,setTimeSpent]=useState(0)

  
  useEffect(() => {
    const startTime=Date.now();
    // console.log("Searching for product:", productName.toLowerCase());
    // console.log("Products data:", products);
  
    if (products && productName) {
      const foundProduct = products.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === productName.toLowerCase());
      // console.log("Found product:", foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
    return () => {
      const endTime = Date.now();
      const timeSpentOnPage = endTime - startTime;
      setTimeSpent(timeSpent + timeSpentOnPage); // Update time spent
    }
  }, [productName, products]);
  // console.log(timeSpent)
  
  // console.log(product)

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image_Url} alt={product.name} />
      <p>{product.description}</p>
      <UserDataCollector data={{ eventType: 'product_view', eventData: product.id,eventMessage:'Product_id' }}/>
      {/* Render other details of the product */}
      {/* {Date.now()-startTime} */}
    </div>
  );
};

export default ProductDetail;
