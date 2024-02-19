// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productsData from './Products.json';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    // You can replace this with an API call to fetch data from a server
    setProducts(productsData);
    // Set other products data if available
    // setOtherProducts(otherProductsData);
  }, []);

  return (
    <div>
      {/* First grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', justifyItems: 'center', alignItems: 'center' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Second grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', justifyItems: 'center', alignItems: 'center' }}>
        {otherProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;




// [
//   {
//     "id": 1,
//     "category": "Computers and Laptops",
//     "name": "MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1 year warranty",
//     "description": "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     "image_Url": [
//       {
//         "public_id": "test",
//         "url": "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png"
//       },
//       {
//         "public_id": "test",
//         "url": "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png"
//       }
//     ],
//     "shop": {
//       "name": "Apple inc.",
//       "shop_avatar": {
//         "public_id": "test",
//         "url": "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
//       },
//       "ratings": 4.2
//     },
//     "price": 1099,
//     "discount_price": 1049,
//     "rating": 4,
//     "total_sell": 35,
//     "stock": 10
//   },
//   {
//     "id": 2,
//     "category": "Mobile and Tablets",
//     "name": "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
//     "description": "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     "image_Url": [
//       {
//         "public_id": "test",
//         "url": "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
//       },
//       {
//         "public_id": "test",
//         "url": "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
//       }
//     ],
//     "shop": {
//       "name": "Amazon Ltd",
//       "shop_avatar": {
//         "public_id": "test",
//         "url": "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png"
//       },
//       "ratings": 4.2
//     },
//     "discount_price": 1099,
//     "rating": 5,
//     "total_sell": 80,
//     "stock": 10
//   }
// ]
