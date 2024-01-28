import React from "react";
import ProductList from "../../../Product/ProductList";
import styles from "../../../styles/styles";
const BestDeals=()=>{
    return(
        <div  className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
            <ProductList/>
        </div>
    )

}

export default BestDeals;