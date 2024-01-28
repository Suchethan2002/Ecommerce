import React from 'react';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { LoginPage,SignUpPage,HomePage, BestSellingPage, ProductPage } from './Routes';
import ProductList from './Product/ProductList';
import ProductCard from './Product/ProductCard';


const App=()=> {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/products' element={<ProductPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
