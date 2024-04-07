// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDataCollector from "./UserDataCollector";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import CategoryDetail from "./CategoryDetail";
import ProductList from "./ProductList";

const ProductDetail = ({ products }) => {
  // console.log(products[0].category);
  const { productCat, productName } = useParams();
  console.log(productCat, productName);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      // Filter products based on the categoryName
      const filtered = products.filter(product => product.category === productCat);
      setFilteredProducts(filtered);
  }, [productCat, products]);
  console.log(filteredProducts)

  const [product, setProduct] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const startTime = Date.now();
    // console.log("Searching for product:", productName.toLowerCase());
    // console.log("Products data:", products);

    if (products && productName) {
      const foundProduct = products.find(
        (p) =>
          p.name.toLowerCase().replace(/\s+/g, "-") ===
          productName.toLowerCase()
      );
      // console.log("Found product:", foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
    return () => {
      const endTime = Date.now();
      const timeSpentOnPage = endTime - startTime;
      setTimeSpent(timeSpent + timeSpentOnPage); // Update time spent
    };
  }, [productName, products]);
  // console.log(timeSpent)

  // console.log(product)

  if (!product) {
    return <div>Product not found</div>;
  }

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "100px" }}
      >
        <div style={{ width: "30%", height: "30%", marginRight: "20px" }}>
          <img
            src={product.image_Url}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              marginLeft: "50px",
              marginRight: "50px",
              maxHeight: "500px",
              minHeight: "500px",
              maxWidth: "500px",
              minWidth: "500px",
            }}
          />
        </div>
        <div style={{ flex: "1", marginLeft: "100px" }}>
          <h2
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontSize: "32px",
            }}
          >
            {product.name}
          </h2>

          <div className="flex" style={{ marginBottom: "20px" }}>
            <h5 className={`${styles.productDiscountPrice}`}>
              ₹{product.price === 0 ? product.price : product.discount_price}
            </h5>
            <h4 className={`${styles.price}`}>
              {product.price ? " ₹" + product.price : null}
            </h4>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <button
              className="bg-gradient-to-r from-black to-black text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
              onClick={decrementCount}
            >
              -
            </button>
            <span className="bg-gray-400 text-gray-800 font-medium px-4 py-[11px]">
              {count}
            </span>
            <button
              className="bg-gradient-to-r from-black to-black text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
              onClick={incrementCount}
            >
              +
            </button>
          </div>

          {/* Product Variations (if applicable) */}
          {product.variations && (
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontSize: "16px", marginRight: "10px" }}>
                Variations:
              </span>
              <select>
                {product.variations.map((variation, index) => (
                  <option key={index} value={variation}>
                    {variation}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Cart Button */}

          <Link to="/checkout">
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                height: "50px",
                width: "150px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            >
              Buy Now
            </button>
          </Link>
          {/* Product Description */}
          <p>{product.description}</p>
        </div>
      </div>
      <ProductList filteredProducts={filteredProducts} />

    </div>
  );
};

export default ProductDetail;
