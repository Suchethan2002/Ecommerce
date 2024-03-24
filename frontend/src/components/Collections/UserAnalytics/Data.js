// ParentComponent.js

import React, { useState, useEffect } from 'react';
// import AnalyticsComponent from './AnalyticsComponent';
import ProductCategory from './ProductCategory';
import AnalyticsHome from './AnalyticsHome';
import Header from '../../Layout/Header';
import udata from './data.json'

const Data = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once
  console.log(analyticsData);

  return (
    <div>
      <Header/>
      <AnalyticsHome Data={udata} />

    </div>
  );
};

export default Data;
