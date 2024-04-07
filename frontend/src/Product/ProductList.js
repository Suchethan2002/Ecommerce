// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
// import productsData from './Products.json';
import { setProductData } from '../Redux/Actions/ProductData';
// import Wishlist from  './Wishlist';
import { fetchWishlist } from '../Redux/Actions/wishlistAction';
import { fetchCart } from '../Redux/Actions/CartAction';

const ProductList = ({filteredProducts}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.productData.productData);
  const products=filteredProducts? filteredProducts : product;
  console.log(filteredProducts)
  console.log(products)
  const cart=useSelector(state=>state.cart.cart)
  const wishlist=useSelector((state)=>state.wishlist.wishlist)
  
  useEffect(() => {
    // Fetch wishlist only if it's not already fetched
    if (wishlist.length===0) {
      
      dispatch(fetchWishlist());
    }
    // Fetch cart only if it's not already fetched
    if (cart.length==0) {
      dispatch(fetchCart());
    }
  }, [dispatch]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data);
        dispatch(setProductData(data));
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Handle null products
  if (products === null) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Products</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (

          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* <Wishlist/> */}
    </div>
  );
};

export default ProductList;

