// src/components/Product.js
import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {
  const d=product.name;
  const product_name=d.replace(/\s+/g,"-");
  console.log(product);
  console.log(product.image_Url);
  return (
    <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
      <div className='flex justify-end'> </div>
      <Link to={`/product/${product_name}`}>
      {(
        <img src={product.image_Url[0].url} alt=""
        className='w-full h-[170px] object-contain'/>)}
        <h4 className='pb-3 font-[500]'>
          {product.name.length>40?product.name.slice(0,40)+"...":product.name}
        </h4>
      </Link>

    </div>
  );
};

export default ProductCard;
