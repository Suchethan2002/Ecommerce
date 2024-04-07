import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './data.json';

const AreaChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Process data to calculate revenue by category
    const revenueByCategory = data.reduce((acc, session) => {
      session.events.forEach(event => {
        if (event.type === 'purchase' && event.category) { // Ensure event has a category
          if (!acc[event.category]) {
            acc[event.category] = 0;
          }
          acc[event.category] += event.discounted_price * event.quantity;
        }
      });
      return acc;
    }, {});

    const categories = Object.keys(revenueByCategory);
    const revenueData = categories.map(category => ({
      category,
      revenue: revenueByCategory[category],
    }));

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 40 }; // Increased bottom margin to accommodate revenue labels
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleBand().domain(categories).range([0, width]).padding(0.2); // Increased padding
    const y = d3.scaleLinear().domain([0, d3.max(revenueData, d => d.revenue)]).range([height, 0]);

    // Add the area
    svg
      .selectAll('.area')
      .data([revenueData])
      .join('path')
      .attr('class', 'area')
      .attr('fill', 'steelblue')
      .attr('d', d3.area()
        .x(d => x(d.category) + x.bandwidth() / 2) // Adjusted x position for alignment
        .y0(y(0))
        .y1(d => y(d.revenue)));

    // Add the X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g').call(d3.axisLeft(y));

    // Add revenue labels
    svg.selectAll('.revenue-label')
      .data(revenueData)
      .enter()
      .append('text')
      .attr('class', 'revenue-label')
      .attr('x', d => x(d.category) + x.bandwidth() / 2)
      .attr('y', d => y(d.revenue) - 10) // Adjusted for positioning
      .attr('text-anchor', 'middle')
      .text(d => `$${d.revenue.toFixed(2)}`);

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default AreaChart;
