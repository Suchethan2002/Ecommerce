import React from "react";
import styles from "../../../styles/styles";
import ProductList from "../../../Product/ProductList";
const Product=()=>{
    return(
        <div  className={`${styles.section}`}>
        <ProductList/>
    </div>
    )
}
export default Product;