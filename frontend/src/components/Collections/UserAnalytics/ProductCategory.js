import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProductCategory = ({ activities }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!activities || activities.length === 0) return;

    const categories = activities.map(activity => activity.category);
    const categoryCounts = {};

    categories.forEach(category => {
      if (categoryCounts[category]) {
        categoryCounts[category] += 1;
      } else {
        categoryCounts[category] = 1;
      }
    });

    const chartLabels = Object.keys(categoryCounts);
    const chartData = Object.values(categoryCounts);

    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Number of Visits',
          data: chartData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Visits'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Category'
            }
          }
        }
      }
    });
  }, [activities]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">User Category Browsing</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ProductCategory;
