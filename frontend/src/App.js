import React from 'react';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { LoginPage,SignUpPage,HomePage, BestSellingPage, ProductPage } from './Routes';
import ProductList from './Product/ProductList';
import ProductCard from './Product/ProductCard';
import UserAnalyticsPage from './pages/UserAnalyticsPage';
import Data from './components/Collections/UserAnalytics/Data';
import productsData from './Product/Products.json';
import ProductDetail from './Product/ProductDetail';


const App=()=> {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path='/analytics' element={<Data/>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/products' element={<ProductPage/>}/>
      <Route path="/product/:productName" element={<ProductDetail products={productsData} />} />


    </Routes>
    </BrowserRouter>
  );
}

export default App;
