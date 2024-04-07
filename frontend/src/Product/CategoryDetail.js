import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDataCollector from './UserDataCollector';
import { Link} from 'react-router-dom';
import styles from "../styles/styles";
import Header from '../components/Layout/Header';
import ProductList from './ProductList';

const CategoryDetail = ({ products }) => {
    console.log(products);
    const { categoryName } = useParams();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Filter products based on the categoryName
        const filtered = products.filter(product => product.category === categoryName);
        setFilteredProducts(filtered);
    }, [categoryName, products]);
    console.log(filteredProducts)


    return(
        <div>
            <Header/>
            <ProductList filteredProducts={filteredProducts} />
        </div>
        
        

    );
};
export default CategoryDetail;

