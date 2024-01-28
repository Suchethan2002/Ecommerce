import React from "react";
import ProductList from "../../../Product/ProductList";
import styles from "../../../styles/styles";
const BestSelling=()=>{
    return(
        <div  className={`${styles.section}`}>
            <ProductList/>
        </div>
    )

}

export default BestSelling;